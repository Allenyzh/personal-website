import posts from "../blogposts/posts.json";

export default function BlogPost() {
  const blogPost = posts[0];
  return (
    <div className="mx-auto">
      <div className="px-10">
        <h1 className="text-3xl md:text-4xl font-bold my-10">
          {blogPost.title}
        </h1>
        {blogPost.content.map((item, index) => {
          switch (item.type) {
            case "p":
              return (
                <p key={index} className="pb-5">
                  {item.text}
                </p>
              );
            case "img":
              return (
                <img
                  key={index}
                  src={item.src}
                  alt={item.alt || "Blog image"}
                  className="pb-5 max-w-[70vmin] max-h-[70vmin] lg:max-w-[100vmin] lg:max-h-[100vmin]"
                />
              );
            case "code":
              return (
                <pre
                  key={index}
                  className="bg-gray-100 p-2 rounded mb-5 dark:text-gray-800"
                >
                  <code className="ml-1">{`> ${item.text}`}</code>
                </pre>
              );
            case "subtitle":
              return (
                <h2 key={index} className="text-2xl font-semibold mb-4">
                  {item.text}
                </h2>
              );
            case "li":
              return (
                <ul key={index} className="list-disc pl-5 mb-5">
                  {Array.isArray(item.items) &&
                    item.items.map((listItem, listIndex) => (
                      <li key={listIndex}>{listItem}</li>
                    ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
