import React, { useState, useEffect, useRef } from 'react'

export const useFetch = (url) => {

    const isMounted = useRef(true)
    
    const [state, setstate] = useState({data: null, loading: true, error: null})

    useEffect( () => {

        return () => {
            isMounted.current = false
        }
    //Con las [] solo se haga cuando el componente se cargue por primera vez
    },[])

    useEffect(() => {

        setstate({data: null, loading: true, error: null});

        fetch( url )
            .then( resp => resp.json())
            .then( data => {

                //El setTimeout es ilustrativo para ver los efectos del ref y el cleanUp
                /* setTimeout( () => {
                    //Si esta montado haz la peticion
                    if (isMounted.current) {
                        
                        setstate({
                            data,
                            loading: false, 
                            error: null
                        })
                    
                    //Como ya no está montado con el cleanUp del useEffect, no llama de nuevo al setState
                    } else {
                        console.log('setState no se llamó')
                    }

                },4000) */

                if (isMounted.current) {
                        
                    setstate({
                        data,
                        loading: false, 
                        error: null
                    })
                }
            })
            .catch( ()=> {
                setstate({
                    data:null,
                    loading:false,
                    error: 'No se pudo cargar la info'
                })
            })
    }, [url])

    return state;

}
