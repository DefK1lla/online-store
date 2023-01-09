import styles from "./style.module.scss";

import { ChangeEvent, FormEvent, PureComponent, ReactNode } from "react";

import { Modal, Paper, TextField, Typography, Stack, Button } from "@mui/material";

import { IProps, IState } from "../../interfaces/IOrderModal";

export class OrderModal extends PureComponent<IProps, IState> {
  state = {
    name: "",
    phone: "",
    address: "",
    email: "",
    cardNumber: "",
    cardValid: "",
    cardCVC: ""
  }

  handleChange = (field: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      this.setState((prevState: IState) => {
        switch (field) {
          case "phone":
            return {
              ...prevState,
              phone: e.target.value.replace(/[^+\d]/g, '')
            };
          default:
            return {
              ...prevState,
              [field]: e.target.value.replace(/ {1,}/g, " ")
            };
        }
      });
    }
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render(): ReactNode {
    return (
      <Modal
        className={styles.overlay}
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Paper
          className={styles.body}
        >
          {
            this.props.isSended
              ? <Typography variant="h5">Your order is on its way</Typography>
              : <Stack
                spacing={2}
                component="form"
                onSubmit={this.handleSubmit}
              >
                <Typography variant="h5" align="center">
                  Personal details
                </Typography>
                <TextField
                  label="Name"
                  variant="standard"
                  required
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                />
                <TextField
                  label="Phone number"
                  variant="standard"
                  type="tel"
                  required
                  value={this.state.phone}
                  onChange={this.handleChange("phone")}
                />
                <TextField
                  label="Delivery address"
                  variant="standard"
                  required
                  value={this.state.address}
                  onChange={this.handleChange("address")}
                />
                <TextField
                  label="Email"
                  variant="standard"
                  type="email"
                  required
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                />

                <div
                  className={styles.card}
                >
                  <TextField
                    label="Card number"
                    variant="standard"
                    required
                    fullWidth
                    value={this.state.cardNumber}
                    onChange={this.handleChange("cardNumber")}
                  />

                  <div
                    className={styles.cardData}
                  >
                    <TextField
                      label="Valid"
                      variant="standard"
                      required
                      value={this.state.cardValid}
                      onChange={this.handleChange("cardValid")}
                    />
                    <TextField
                      label="CVC"
                      variant="standard"
                      required
                      value={this.state.cardCVC}
                      onChange={this.handleChange("cardCVC")}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                >
                  Confirm
                </Button>
              </Stack>
          }
        </Paper>
      </Modal>
    )
  }
}