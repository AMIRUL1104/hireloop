const RichContent = ({ content }) => {
  // Guard: empty string, null, undefined সব handle করো
  if (!content || typeof content !== "string" || content.trim() === "") {
    return (
      <p className="text-gray-500 text-sm italic">No information provided.</p>
    );
  }

  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed
          prose-li:text-gray-300 prose-li:my-1
          prose-ul:pl-5 prose-ul:space-y-1
          prose-ol:pl-5 prose-ol:space-y-1
          prose-strong:text-white
          prose-p:text-gray-300 prose-p:leading-7"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const lines = content.split("\n").filter((line) => line.trim() !== "");

  // Guard: split এর পরেও empty হলে
  if (lines.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">No information provided.</p>
    );
  }

  return (
    <ul className="space-y-2.5 text-gray-300 text-sm leading-relaxed">
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/70 shrink-0" />
          <span>{line.replace(/^[-•*]\s*/, "")}</span>
        </li>
      ))}
    </ul>
  );
};

export default RichContent;
