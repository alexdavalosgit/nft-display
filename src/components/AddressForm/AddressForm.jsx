import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import "./AddressForm.css";
import NFTList from "../NftLists/NftLists";

function AddressForm() {
  // state
  const [address, setAddress] = useState("");
  const [nftList, setNftList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchNfts();
    console.log(address);
  };

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  // Fetch NFTS
  const fetchNfts = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.nftport.xyz/v0/accounts/${address}?chain=ethereum`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${import.meta.env.VITE_NFT_KEY}`,
        },
      }
    );
    if (res.ok) {
      setLoading(false);
      const json = await res.json();
      console.log(json.nfts);
      setNftList(json.nfts);
    } else {
      console.log(`res failed with code ${res.status}`);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="address-form-container">
      <h1>Enter your NFT address:</h1>
      <p>Example Address: 0x07f0E22E58F1dfDf754A57Aa99104D417a13089E</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAddress">
          <Form.Control
            type="text"
            placeholder="0x..."
            value={address}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              style={{ height: "1rem", width: "1rem" }}
            />
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
      <Modal show={error} onHide={() => setError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There was an error with your submission. Please try again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setError(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <NFTList nfts={nftList} address={address} />
    </div>
  );
}

export default AddressForm;
