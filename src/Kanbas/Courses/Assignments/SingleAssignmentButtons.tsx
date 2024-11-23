
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as assignmentsClient from "./client";

export default function SingleAssignmentButtons({ currentAssignment }: any) {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scale, setScale] = useState(1); // Default scale is 1 (normal size)
    const [showModal, setShowModal] = useState(false); // Modal visibility state

    const handleDelete = async () => {
        await assignmentsClient.deleteAssignment(currentAssignment._id as string);
        dispatch(deleteAssignment(currentAssignment));
        setShowModal(false); // Close the modal after deletion
        navigate(`/kanbas/courses/${cid}/Assignments/`); //navigate back to assignments page
    };

    return (
        <div className="float-end">
            <FaTrash
                className="text-danger me-2 fs-5"
                style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-in-out" }}
                onMouseDown={() => setScale(0.8)} // Shrinks on mouse down
                onMouseUp={() => setScale(1)} // Reverts back to normal size on mouse up
                onMouseLeave={() => setScale(1)} // Ensures it returns to normal if the mouse leaves the icon
                onClick={() => setShowModal(true)} // Open the modal on click
            />
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to <span className="text-danger fw-bold">remove</span> the assignment: {currentAssignment.title}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
