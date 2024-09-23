import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BookingFormData, bookingSchema } from "../../types/BookingForm";
import { postBookings } from "../../api/post";

/**
 * Booking form component
 *
 * @returns {*}
 */
const BookingForm: React.FC = () => {
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const bookingMutation = useMutation({
    mutationFn: postBookings,
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data, {
      onSuccess: () => {
        setAlertInfo({
          type: "success",
          message: "Booking successful! We look forward to seeing you.",
        });
        reset();
      },
      onError: (error) => {
        setAlertInfo({
          type: "danger",
          message: `Booking failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      },
    });
  };

  return (
    <Container>
      <h2 className="my-4">Book a Table</h2>
      {alertInfo && (
        <Alert
          variant={alertInfo.type}
          onClose={() => setAlertInfo(null)}
          dismissible
        >
          {alertInfo.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                    isInvalid={!!errors.name}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="tel"
                    placeholder="Enter your phone number"
                    isInvalid={!!errors.phone}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="guests">
              <Form.Label>Guests</Form.Label>
              <Controller
                name="guests"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="number"
                    placeholder="Number of guests"
                    isInvalid={!!errors.guests}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.guests?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="date"
                    isInvalid={!!errors.date}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="time">
              <Form.Label>Time</Form.Label>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="time"
                    isInvalid={!!errors.time}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.time?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={bookingMutation.isPending}
        >
          {bookingMutation.isPending ? "Booking..." : "Book"}
        </Button>
      </Form>
    </Container>
  );
};

export default BookingForm;
