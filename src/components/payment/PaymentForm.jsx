import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Form, Button, Row, Col, Alert } from "react-bootstrap"

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [error, setError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
  
      try {
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
  
        const paymentData = {
          amount: parseFloat(amount),
          currency,
          paymentMethodId: paymentMethod.id,
        };
  
        const response = await axios.post('http://localhost:8080/payments/process', paymentData);
  
        if (response.status === 200) {
          setPaymentStatus('Payment successful!');
        } else {
          setPaymentStatus('Payment failed.');
        }
      } catch (error) {
        setError(error.message);
        setPaymentStatus('Payment failed.');
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Currency</Form.Label>
            <Form.Control
              as="select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </Form.Control>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Payment Details</Form.Label>
          <CardElement />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={!stripe} block>
          Pay
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {paymentStatus && <Alert variant="info" className="mt-3">{paymentStatus}</Alert>}
      </Form>
    );
  };
  
  export default PaymentForm;