import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function NftCard({ nft, address }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card
        className="nft-card"
        style={{ backgroundImage: `url(${nft.cached_file_url})` }}
        onClick={handleShowModal}
      >
        <Card.Title>{nft.name}</Card.Title>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{nft.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{nft.description}</p>
          <p>Contract: {nft.contract_address}</p>
          <p>Owner: {address}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            target="_blank"
            href={`https://opensea.io/assets/ethereum/${nft.contract_address}/${nft.token_id}`}
          >
            {" "}
            Purchase{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NftCard;
