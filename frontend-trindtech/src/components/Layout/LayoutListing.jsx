import { useState } from "react";
import DynamicHeader from "../Header/DynamicHeader";
import Search from "../Listing/Search";
import List from "../Listing/List";

function LayoutListing() {

    const [searchResults, setSearchResults] = useState([]);

    return (
        <>
            <DynamicHeader
                showLogo={true}
            />
            <Search setSearchResults={setSearchResults} />
            <List searchResults={searchResults} />
        </>
    );
};

export default LayoutListing;