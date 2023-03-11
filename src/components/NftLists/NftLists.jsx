import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./NftLists.css"; // Your custom styles
import ReactPaginate from "react-paginate";
import NftCard from "./NftCard";

function NFTList({ nfts, address }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedNFTs, setPaginatedNFTs] = useState([]);
  // const
  const NFTsPerPage = 10;

  // pagination
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const startIndex = currentPage * NFTsPerPage;
    const endIndex = startIndex + NFTsPerPage;
    setPaginatedNFTs(nfts.slice(startIndex, endIndex));
  }, [currentPage, nfts]);

  return (
    <Container fluid className="pt-5">
      <div className="nft-card-grid">
        {paginatedNFTs.map((nft, index) => (
          <NftCard key={index} nft={nft} address={address} />
        ))}
      </div>
      <div className="paginate-container">
        <ReactPaginate
          pageCount={Math.ceil(nfts.length / NFTsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </Container>
  );
}

export default NFTList;
