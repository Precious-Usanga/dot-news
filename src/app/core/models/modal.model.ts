export interface IModalDialogData {
    modal: string;
    action: string;
    question?: string;
    extraData?: any;
    color?: string;
}

export interface IModalResult {
  result: Result;
}

interface Result {
  data: any;
  status: string;
  message: string;
}
