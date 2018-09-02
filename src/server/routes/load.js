import Joi from "joi";

import { getSaveData } from "server/db";

const loadSchema = Joi.object({
  name: Joi.string().required()
});

const loadRoute = (req, res) => {
  const ret = Joi.validate(req.body, loadSchema, { allowUnknown: false });

  if (ret.error) {
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;

  getSaveData(data.name, (error, data) => {
    if (error) return res.status(400).end(error);

    return res.send(data.data);
  });
};

export default loadRoute;
