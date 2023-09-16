import axios from "axios";

export const getNewCode = async () => {
  const res = await axios.get(`/api/newCode`);

  return res.data.id;
};
