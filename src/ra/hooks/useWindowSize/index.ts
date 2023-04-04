import {useEffect, useState} from "react";

const useWindowSize = () => {
    const [size, setSize] = useState<{ width: number, height: number }>({width: 0, height: 0});

    useEffect(() => {
        getWindowSize();
    }, [])

    function getWindowSize() {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    window.onresize = getWindowSize;
    // getWindowSize();

    return size;
}

export default useWindowSize;
