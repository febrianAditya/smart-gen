

export default function FooterComponent() {

    return(
        <>
            <footer className="text-center text-muted py-3 mt-auto" style={{ backgroundColor: "#2D4059"}}>
                <small style={{ color: "white"}}>© {new Date().getFullYear()} Smart PDF Generator - Febrian Aditya</small>
            </footer>
        </>
    )
}