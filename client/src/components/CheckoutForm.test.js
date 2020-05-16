import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const { getByText } = render(<CheckoutForm />);
    const header = getByText(/Checkout Form/i);
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    const { getByLabelText, getByTestId, findByText } = render(<CheckoutForm />);
    const firstName = getByLabelText(/First Name:/i);
    const lastName = getByLabelText(/Last Name:/i);
    const address = getByLabelText(/Address:/i);
    const city = getByLabelText(/City:/i);
    const state = getByLabelText(/State:/i);
    const zip = getByLabelText(/Zip:/i);
    const checkout = getByTestId(/checkout/i);

    fireEvent.change(firstName, { target: { value: 'James' } });
    fireEvent.change(lastName, { target: { value: 'Leyden' } });
    fireEvent.change(address, { target: { value: '123 Fake St' } });
    fireEvent.change(city, { target: { value: 'Columbia' } });
    fireEvent.change(state, { target: { value: 'MO' } });
    fireEvent.change(zip, { target: { value: '65203' } });
    fireEvent.click(checkout);

    expect(firstName.value).toBe('James');
    expect(lastName.value).toBe('Leyden');
    expect(address.value).toBe('123 Fake St');
    expect(city.value).toBe('Columbia');
    expect(state.value).toBe('MO');
    expect(zip.value).toBe('65203');
    expect(checkout).toBeInTheDocument();
    findByText('You have ordered some plants! Woo-hoo!');

});
