import { holderModel } from "../sequelize";
import { Op } from "sequelize";
import { format } from "date-fns";

const MIN_CX_BALANCE = 15000;

export const scan = async () => {
  try {
    console.log("Remove cx holder not holding");
    await holderModel.holders.update(
      { status: 2 },
      { where: { amount: { [Op.lt]: MIN_CX_BALANCE } } }
    );
  } catch (error) {
    console.log(error);
    console.log(`Scan holder finish at: ${format(new Date(), "dd/MM/yyyy hh:mm:ss")}`);
  }
};

// export const scan = async () => {
//   try {
//     console.log("Start scan");

//     const accounts = await peatioModel.accounts.findAll({
//       attributes: ["member_id", "currency_id", "balance"],
//       where: {
//         currency_id: "cx",
//         balance: {
//           [Op.gte]: MIN_CX_BALANCE,
//         },
//       },
//     });

//     // reset holders
//     await holderProd.holders.update(
//       { status: 0, updated_at: new Date() },
//       { where: {} }
//     );

//     for await (const account of accounts) {
//       const { member_id, balance } = account;
//       const { uid } = (await peatioModel.members.findOne({
//         where: { id: member_id },
//       })) || { uid: undefined };
//       if (uid) {
//         const isHolderExist = await holderProd.holders.count({
//           where: { member_id: member_id, uid: uid },
//         });

//         if (isHolderExist === 0) {
//           // unexist
//           await holderProd.holders.create({
//             member_id: member_id,
//             uid: uid,
//             amount: balance,
//             status: 1,
//             created_at: new Date(),
//             updated_at: new Date(),
//           });
//         } else {
//           await holderProd.holders.update(
//             { status: 1, amount: balance, updated_at: new Date() },
//             {
//               where: {
//                 member_id: member_id,
//                 uid: uid,
//               },
//             }
//           );
//         }
//       }
//     }

//     console.log(`Finish at: ${format(new Date(), "dd/MM/yyyy hh:mm:ss")}`);
//   } catch (error) {
//     console.log(error);
//   }
// };
