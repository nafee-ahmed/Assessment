// The types of axios are here
export interface SucessAuthMessage {
  access_token: string;
  name: string;
  id: number;
}

export interface Club {
  title: string;
  about: string;
  pastActiveMembers: number;
  contactName: string;
  contact: string;
  fee: number;
  id: number;
  hasApplied?: boolean;
}

export interface SuccessClubMessageList {
  message: Club[] | undefined;
}
