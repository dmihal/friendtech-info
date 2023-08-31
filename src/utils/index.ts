import { SimpleAccountData } from "@/api";

export function getAccountName(account: SimpleAccountData): string {
  return account.twitterUsername || account.id.substring(0, 12)
}

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ')
}
