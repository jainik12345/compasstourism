
const IndianCityPageBanner = ({ Heading, BgImg }) => {
    return (
        <>

            <div className="bg-cover bg-center h-[300px] flex items-center justify-center " style={{ backgroundImage: `url(${BgImg})` ,backgroundSize: 'cover' }}>
                <h1 className="text-white text-[2.5rem] font-semibold text-center">{Heading} Tour Packages</h1>
            </div>

        </>
    )
}

export default IndianCityPageBanner
