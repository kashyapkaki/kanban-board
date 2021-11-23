import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { columnsRawData } from "../KanbanData";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  const [totalCount, settotalCount] = useState(0);
  const [totaldone, settotaldone] = useState(0);
  const [totalpending, settotalpending] = useState(0);
  const [columns, setColumns] = useState(
    JSON.parse(window.localStorage.getItem("columns")) || columnsRawData
  );

  useEffect(() => {
    const total = columns
      .map((x) => {
        return x.taskIds.length;
      })
      .reduce((partial_sum, a) => partial_sum + a, 0);
    const done = columns
      .map((x) => {
        return x.taskIds;
      })
      .pop().length;
    const pending = columns
      .map((x) => {
        return x.taskIds.length;
      })
      .splice(0, 3)
      .reduce((partial_sum, a) => partial_sum + a, 0);
    settotalCount(total);
    settotaldone(done);
    settotalpending(pending);
  }, [columns]);

  return (
    <div className="dashboard-cards">
      <Card bg="primary" text="white" style={{ width: "18rem" }}>
        <Card.Header>Total</Card.Header>
        <Card.Body>
          <Card.Title>{totalCount}</Card.Title>
          <Card.Text>Total Tasks Created</Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="secondary" text="white" style={{ width: "18rem" }}>
        <Card.Header>Pending</Card.Header>
        <Card.Body>
          <Card.Title>{totalpending}</Card.Title>
          <Card.Text>Total Tasks Pending</Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card bg="success" text="white" style={{ width: "18rem" }}>
        <Card.Header>Completed</Card.Header>
        <Card.Body>
          <Card.Title>{totaldone}</Card.Title>
          <Card.Text>Total Tasks Completed</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default Dashboard;
