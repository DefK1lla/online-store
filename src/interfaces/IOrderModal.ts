export interface IProps {
  open: boolean;
  onClose(): void;
  onSubmit(data: IState): void;
  isSended: boolean
}

export interface IState {
  name: string;
  phone: string;
  address: string;
  email: string;
  cardNumber: string;
  cardValid: string;
  cardCVC: string
}