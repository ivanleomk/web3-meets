const faqs = [
  {
    question: "When will my event be posted on the Web3Meets channel?",
    answer:
      "When your event is posted depends on a few factors, including the current queue of events and event date.Do let us know if you have any special requirements!",
  },
  {
    question:
      "Where can I submit my event to be promoted on the Web3Meets Telegram Channel?",
    answer:
      "Anyone with an account can submit events to be promoted on our channel and website. Simply fill in the Add Event form and we will reach out if needed",
  },
];

export default function FAQ() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white">
      <div className="max-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="max-w-xl">
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base text-gray-500">
            If you can't find what you're looking for, you can always{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              send us an email
            </a>{" "}
            with your enquiry.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-y-10 sm:mt-16 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <dt className="text-base font-medium text-gray-900">
                {faq.question}
              </dt>
              <dd className="mt-3 text-sm text-gray-500">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
