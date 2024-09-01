import { useEffect, useRef } from 'react';

function useEffectAfterMount(callback, dependencies) {
    const hasMounted = useRef(false);
    useEffect(() => {
        if (hasMounted.current) {
            return callback();
        } else {
            hasMounted.current = true;
        }
    }, dependencies);
}
export default useEffectAfterMount;