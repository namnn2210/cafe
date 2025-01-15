export default function Header() {
    return (
        <header className="w-full bg-gray-100 border-b border-gray-300">
            <div className="max-w-screen-sm mx-auto flex justify-center items-center h-16">
                <img
                    src="/logo.png" // Replace this with the path to your logo
                    alt="Cafe Logo"
                    className="h-10 w-auto"
                />
            </div>
        </header>
    );
}
