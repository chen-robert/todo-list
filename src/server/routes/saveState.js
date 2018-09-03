import Joi from "joi";

import { saveState } from "server/db";

const saveStateSchema = Joi.object({
  name: Joi.string().required(),
  state: Joi.string().required()
});

const saveStateRoute = (req, res) => {
  const ret = Joi.validate(req.body, saveStateSchema, { allowUnknown: false });

  if (ret.error) {
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;

  saveState(data.name, data.state, error => {
    if (error) return res.status(400).end(error);

    return res.send("Saved");
  });
};

export default saveStateRoute;
