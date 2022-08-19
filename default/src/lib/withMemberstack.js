import { NextResponse } from "next/server";
import { verifyAuth, getCurrentMember, getApp } from "@/app/lib/memberstack";
import {
  memberHasPlans,
  RestrictedURLGroup,
} from "@/app/helpers/restrictedUrlGroup";

const MS_TOKEN = "_ms-mid";

export default function withMemberstack(
  handler,
  { useRestrictedUrls, ...options }
) {
  return async (req, event) => {
    const url = req.nextUrl.clone();

    let member;
    let token_verified = false;
    let newReq;

    try {
      let app = await getApp();
      // get restricted url info from contentGroup settings
      let restrictedUrls = app?.contentGroups;

      let auth = await verifyAuth(req.cookies.get(MS_TOKEN));
      if (auth && auth?.id) {
        member = await getCurrentMember(req.cookies.get(MS_TOKEN));
        token_verified = true;
      }

      // attach memberstack info to req object
      newReq = Object.assign(req, {
        memberstack: {
          app,
          member,
          token_verified,
        },
      });

      // if path is an api route OR
      // if not using restricted urls OR none exist - skip route check
      if (
        url.pathname.startsWith("/api/") ||
        !useRestrictedUrls ||
        !restrictedUrls
      ) {
        // return handler w/ memberstack info
        return handler(newReq, event);
      }

      //  proceed to check if path is restricted
      let urlGroup = new RestrictedURLGroup(restrictedUrls, url.pathname);
      if (!urlGroup || !urlGroup.info) {
        return handler(newReq, event);
      }

      let { key, redirect, allowAllMembers } = urlGroup.info;
      let plans = urlGroup.plans;
      let isRestricted = urlGroup.isRestricted();

      if (isRestricted) {
        url.pathname = `/${redirect}` || `/login`;

        // if jwt is invalid, redirect to contentGroup's redirect url
        if (!token_verified) {
          console.log(`redirecting because member's jwt is not verified`);
          return NextResponse.redirect(url);
        }

        // if jwt is valid, member exists, and member has plans...
        // AND if contentGroup is not open to all members, redirect to contentGroup's redirect url
        if (member && !allowAllMembers && plans?.length) {
          if (!memberHasPlans(member, plans)) {
            console.log(
              `redirecting because member does not have required plans`
            );
            return NextResponse.redirect(url);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    return handler(req, event);
  };
}
