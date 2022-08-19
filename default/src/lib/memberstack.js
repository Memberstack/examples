import memberstackAdmin from "@memberstack/admin";

const memberstack = memberstackAdmin.init(process.env.MEMBERSTACK_SECRET_KEY);

const createHeaders = ({ method = "GET", type, token }) => ({
  method,
  headers: {
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    "x-api-key":
      type === "admin"
        ? process.env.MEMBERSTACK_SECRET_KEY
        : process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY,
  },
});

export async function verifyAuth(token) {
  try {
    const auth = await memberstack.verifyToken({ token });
    return auth;
  } catch (error) {
    // console.log({ error });
  }
}

export async function getCurrentMember(token) {
  try {
    let res = await fetch(
      "https://client.memberstack.com/member",
      createHeaders({ type: "client", token })
    );
    let { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getMember(id) {
  if (!id) throw new Error("Missing user ID");
  try {
    let res = await fetch(
      `https://admin.memberstack.com/members/${id}`,
      createHeaders({ type: "admin" })
    );
    let { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getApp() {
  try {
    let res = await fetch(
      "https://client.memberstack.com/app",
      createHeaders({ type: "client" })
    );
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(error);
    throw new Error(error);
  }
}
