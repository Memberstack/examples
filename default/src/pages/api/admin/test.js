const getSite = (req, res) => res.status(200).send("get");
const createSite = (req, res) => res.status(200).send("create");
const deleteSite = (req, res) => res.status(200).send("delete");
const updateSite = (req, res) => res.status(200).send("update");

async function handler(req, res) {
  //   const session = await unstable_getServerSession(req, res, authOptions);
  //   if (!session) return res.status(401).end();

  switch (req.method) {
    case "GET":
      return getSite(req, res);
    case "POST":
      return createSite(req, res);
    case "DELETE":
      return deleteSite(req, res);
    case "PUT":
      return updateSite(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
