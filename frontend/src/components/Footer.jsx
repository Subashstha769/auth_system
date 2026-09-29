function Footer(){
    return(
        <footer className="w-full h-[60px] bg-black flex items-center justify-center">
            <p className="text-gray-500">&copy; Auth System. Copyright {new Date().getFullYear()}. All right reserved</p>
        </footer>
    );
}
export default Footer;