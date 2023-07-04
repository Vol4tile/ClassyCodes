import { HTTP } from "../axios";

const getAll = () => {
  return HTTP.get("/Question/Q");
};

const TutorialService = {
  getAll,
};

export default TutorialService;

