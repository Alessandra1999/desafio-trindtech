import DynamicHeader from "../Header/DynamicHeader";
import Search from "../Listing/Search";

function LayoutListing() {
    return (
        <>
            <DynamicHeader
                showLogo={true}
            />
            <Search />
        </>
    );
};

export default LayoutListing;