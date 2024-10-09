import DynamicHeader from "../Header/DynamicHeader";
import Search from "../Listing/Search";
import List from "../Listing/List";

function LayoutListing() {
    return (
        <>
            <DynamicHeader
                showLogo={true}
            />
            <Search />
            <List />
        </>
    );
};

export default LayoutListing;