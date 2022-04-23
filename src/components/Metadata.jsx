export default function Metadata ({ readtime, slug }) { 
    return (
    <div className="flex align-middle gap-3 text-xs flex-wrap">
        <p className="m-0 flex items-center"><b>Read Time: </b>{`📖 ${readtime} minutes`}</p>
        {slug && (
            <a id="gh-link" className="flex content-center gap-1 items-center relative no-underline" target="_blank" rel="noopener noreferrer" href={`https://github.com/pol-piella/polpiella.dev/edit/main/src/pages/${slug}.md`}>
                <img className="w-5 m-0" src="/assets/github.svg" />
                <b>Found a mistake? Edit on Github!</b>
            </a>
        )}
    </div>
)}