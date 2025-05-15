"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextAnimate } from "@/components/magicui/text-animate";

const Faq = () => {
  return (
    <div className="w-full h-screen bg-[#141414] flex flex-col items-center justify-center">
      <Accordion
        type="single"
        collapsible
        className="w-3xl text-white text-align"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>❓ Spotty гэж юу вэ?</AccordionTrigger>
          <AccordionContent>
            <TextAnimate animation="fadeIn" by="line" as="p">
              {`Spotty бол сонирхолтой байршлууд болон үйл явдлуудыг газрын зураг дээрээс олж илрүүлэх боломж олгодог\n\nинтерактив платформ юм. Та нууцлаг газрууд эсвэл олон нийтийн арга хэмжээнүүдийг хайж байгаа эсэхээс үл\n\nхамааран  Spotty танд ойр орчмын боломжуудыг үзүүлэхэд тусална.`}
            </TextAnimate>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
