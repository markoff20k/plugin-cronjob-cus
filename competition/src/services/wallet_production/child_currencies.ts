import { toLower } from "lodash";
import { child_currencies } from "../../sequelize/models/wallet_production/child_currencies";

export const getListChildID = async (parent_id: string) => {
  const childs = await child_currencies.findAll({
    where: {
      parent_id: toLower(parent_id),
    },
  });
  const new_childs = childs.map((child) => child.child_id);
  return [...new_childs, parent_id];
};
