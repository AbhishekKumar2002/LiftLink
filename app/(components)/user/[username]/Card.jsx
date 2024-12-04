import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import RemoveButton from "./RemoveButton";
import { parseDateAndTime } from "@/utils/parseDateAndTime";

export default function Card({ from, to, cardId, date, remove }) {
  const { formattedDate, formattedTime } = parseDateAndTime(date)
  return (
    <CardContainer className="inter-var w-full p-4">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[100%] sm:w-[25rem] h-auto rounded-xl p-6 border ">

        <div className="mt-2 mb-2 font-bold">
          <CardItem
            as="p"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 bg-red"
          >
            From: {from}
          </CardItem>
          <CardItem
            as="p"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 bg-red"
          >
            To: {to}
          </CardItem>
          <CardItem
            as="p"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 bg-red"
          >
            Date: {formattedDate}
          </CardItem>
          <CardItem
            as="p"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 bg-red"
          >
            Time: {formattedTime}
          </CardItem>
        </div>
        <div className="flex justify-between items-center gap-4 font-bold">
          <RemoveButton id={cardId} remove={remove} />
        </div>
      </CardBody>
    </CardContainer>
  );
}
