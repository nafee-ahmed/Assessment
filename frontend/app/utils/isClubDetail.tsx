export interface ClubDetail {
  id: number;
  title: string;
  about: string;
  fee: number;
  pastActiveMembers: number;
  contactName: string;
  contact: string;
  hasApplied: boolean;
}

export default function isClubDetail(obj: unknown): obj is ClubDetail {
  if (
    typeof obj !== "object" ||
    obj === null ||
    !("about" in obj) ||
    !("contact" in obj) ||
    !("contactName" in obj) ||
    !("fee" in obj) ||
    !("hasApplied" in obj) ||
    !("id" in obj) ||
    !("pastActiveMembers" in obj) ||
    !("title" in obj)
  ) {
    return false;
  } else {
    return true;
  }
}
