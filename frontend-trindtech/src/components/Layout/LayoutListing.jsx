import DynamicHeader from "../Header/DynamicHeader";
import Listing from "../Listing/Listing";

function LayoutListing() {
    return (
        <>
            <DynamicHeader
                showLogo={true}
            />
            <Listing />
        </>
    );
};

export default LayoutListing;