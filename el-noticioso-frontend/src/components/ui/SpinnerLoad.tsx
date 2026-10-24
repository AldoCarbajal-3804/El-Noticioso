export const SpinnerLoad = () => {

    return(
        <p role="status" className="flex justify-center gap-2 text-third">
            CARGANDO <div className="h-8 w-8 animate-spin rounded-full border-4 border-third border-t-transparent "></div>
        </p>
    )

}