import Nav from "react-bootstrap/Nav";
import { Link, useParams, useLocation } from "react-router-dom";

export default function EditNavigation() {
  const { cid, quizId } = useParams();
  const location = useLocation(); // Get current location
  return (
    <Nav variant="tabs" activeKey={location.pathname}>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`}
          eventKey={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`}
        >
          <span className="fw-bold text-dark ">Details</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions`}
          eventKey={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions`}
        >
          <span className="fw-bold text-danger">Questions</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
