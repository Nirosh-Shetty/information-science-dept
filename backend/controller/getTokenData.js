export const getTokenData = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) res.status(405).json({ message: "unauthorised!!!" });
  jwt.verify(token, "00000", (err, user) => {
    if (err) {
      return res.status(406).json({ message: "forbidden!!!!!" });
    }
    res.status(201).json({ message: "sucesfully authorised" });
  });
};
