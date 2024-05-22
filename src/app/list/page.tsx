import { db } from "@/db";

export default async function RenderList() {
  const list = await db.Shopping.findMany();

  return JSON.stringify(list);

  // const renderList = list.map((item) => {
  //   return (
  // <div key={item.id}>
  //   {item.date} = {item.budget}
  // </div>
  //   );
  // });

  // return <div>{renderList}</div>;
}
