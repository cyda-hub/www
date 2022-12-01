
import urlExist from "url-exist";

export const validateURL = async (req, res, next) => {
    const { destination } = req.body;
    const isExist = await urlExist(destination);

    if (!isExist) {
      return res.json({ message: "Invalid URL", type: "failure" });
    }

    next();
};

