import cn from "@core/utils/class-names";
import NewsLetterForm from "@/app/shared/newsletter/newsletter-4/newsletter-form";
import { useTranslations } from "next-intl";

export default function NewsLetter({ className }: { className?: string }) {
  const t = useTranslations("common");
  return (
    <div
      className={cn(
        className,
        "rounded-2xl border border-gray-100 bg-white @container dark:bg-gray-50"
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-6 @2xl:p-12 3xl:px-16 4xl:px-28">
        <div className="w-full max-w-[640px]">
          <div className="mb-8 text-center @2xl:mb-12">
            <h2 className="mb-2 text-xl @2xl:mb-3 @2xl:text-2xl">
              {t("text-subscribe-newsletter-details-three")}
            </h2>
            <p className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base">
              {t("text-subscribe-newsletter")}
            </p>
          </div>
          <NewsLetterForm />
        </div>
      </div>
    </div>
  );
}
