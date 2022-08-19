import Switch from "@/components/Switch";
import DashboardNavBar from "./dashboard/NavBar";
import NavBar from "./NavBar";

const BasicLayout = ({ children }) => (
  <div className="h-screen flex flex-col bg-[#282c34]">
    <NavBar color={"bg-[#282c34]"} />
    <main className="mx-auto my-auto max-w-7xl px-4">{children}</main>
  </div>
);

const ContentLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <DashboardNavBar />
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
      </header>
      <main className="w-screen overflow-auto">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

const MainContent = ({ children }) => (
  <div className="flex-1 flex flex-col h-screen justify-between overflow-hidden">
    <header className="w-full h-[65px] bg-emerald-600" />
    {/* <!-- Main content --> */}
    {/* <div className="flex-1 flex items-stretch overflow-hidden">{children}</div> */}
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1">
        <div className="flex flex-col w-full">{children}</div>
      </main>
      {/* <footer /> */}
    </div>
    <footer />
  </div>
);

const RightBox = ({ color }) => {
  /* <!-- Secondary column (hidden on smaller screens) --> */
  return (
    <aside className="hidden lg:block self-center w-96 mx-3 overflow-hidden shadow-lg">
      <div className="h-[96vh] bg-red-400 p-8 rounded-lg">
        {/* <ActivityFeed /> */}hello
      </div>
    </aside>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* <SideBar signOut={signOut} /> */}
      <MainContent>{children}</MainContent>
      <RightBox />
    </div>
  );
};
const withLayout = (Page, variant) => (props) =>
  (
    <Switch expression={variant} fallback={<Page {...props} />}>
      <BasicLayout case="basic">
        <Page {...props} />
      </BasicLayout>
      <ContentLayout case="content">
        <Page {...props} />
      </ContentLayout>
      <DashboardLayout case="dashboard">
        <Page {...props} />
      </DashboardLayout>
    </Switch>
  );

export default withLayout;

const LayoutController = ({
  children,
  path,
  allowAllMembers,
  requiredPlans,
}) => {
  return (
    <>
      {isRestricted ? (
        <MemberstackProtected onUnauthorized={<SignInModal />}>
          {!config?.allowAllMembers && config?.plans.length > 0 ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </MemberstackProtected>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};
