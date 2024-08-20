import { DetailedHTMLProps, HTMLAttributes } from "react";

import { useTranslation } from "react-i18next";

import enJson from "@/localization/en.json";

type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
type LocalizationStructure = typeof enJson;

type NestedKeys<T, Depth extends number = 5> = [Depth] extends [never]
  ? never
  : {
      [K in keyof T & string]: T[K] extends object ? K | `${K}.${NestedKeys<T[K], Prev[Depth]>}` : K;
    }[keyof T & string];

type Prev = [never, 0, 1, 2, 3, 4, 5];

type TPrefix = keyof LocalizationStructure;
type TKey<T extends TPrefix> = NestedKeys<LocalizationStructure[T]>;

type TranslatedTextProps<T extends TPrefix> = SpanProps & {
  tPrefix?: T;
  tKey?: T extends TPrefix ? TKey<T> : never;
};

export const TranslatedText = <T extends TPrefix>({ tPrefix, tKey, ...props }: TranslatedTextProps<T>) => {
  const { t } = useTranslation();

  let translationKey = "missing-translation-key";
  if (tPrefix && tKey) {
    translationKey = tPrefix + "." + tKey;
  }

  return <span {...props}>{t(translationKey)}</span>;
};
