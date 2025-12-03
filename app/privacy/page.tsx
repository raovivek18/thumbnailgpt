import type { Metadata } from "next"
import ThumbnailGPTHeader from "@/components/thumbnail-gpt-header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | ThumbnailGPT",
  description: "Learn how ThumbnailGPT collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <>
      <ThumbnailGPTHeader />
      <main className="min-h-screen bg-black text-white pt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-8">
            Privacy <span className="text-[#FF8D00]">Policy</span>
          </h1>
          <p className="text-gray-400 mb-6">Last Updated: January 2025</p>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              At ThumbnailGPT, we respect your privacy and are committed to protecting your personal information. This
              Privacy Policy explains what data we collect, how we use it, and how we keep it safe.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">A. Google Login Data</h3>
              <p className="mb-3">We use Google Login only. When you sign in, Google provides us with:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                <li>Your Name</li>
                <li>Your Email</li>
                <li>Your Profile Picture</li>
              </ul>
              <p className="mb-4">This information is used only to create your account and manage your credit usage.</p>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">B. User Inputs</h3>
              <p className="mb-2">We collect:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
                <li>Text prompts</li>
                <li>Feature used</li>
                <li>Time of generation</li>
                <li>Generated image URL</li>
                <li>UUID</li>
                <li>Credit usage data</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#FF8D00] mb-2">C. Uploaded Images</h3>
              <p className="mb-2">For all our features:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-2">
                <li>Text to Thumbnail (1 reference image optional)</li>
                <li>Image to Thumbnail (up to 5 images)</li>
                <li>Recreate Thumbnail (existing thumbnail, YouTube link image, and optional persona image)</li>
              </ul>
              <p className="font-semibold text-white">
                All uploaded images are automatically deleted after AI processing. We do not store or keep your uploaded
                content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. What We Store Permanently</h2>
              <p className="mb-2">We only store:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Generated image URL</li>
                <li>Prompt text</li>
                <li>Feature used</li>
                <li>Time of creation</li>
                <li>UUID</li>
              </ul>
              <p className="mt-3">
                Generated images are stored in our secure storage at:{" "}
                <span className="text-[#FF8D00]">storage.thumbnailgpt.com</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Payments & Security</h2>
              <p>
                Credits are purchased using Dodo Payment Gateway (powered). We do not store any payment information such
                as cards, bank details, UPI IDs, etc. All payment data is handled securely by our payment provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. How We Use Your Information</h2>
              <p className="mb-2">We use collected data to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Generate thumbnails using AI</li>
                <li>Track usage and credits</li>
                <li>Improve the platform</li>
                <li>Provide customer support</li>
                <li>Prevent misuse or policy violation</li>
              </ul>
              <p className="mt-3 font-semibold text-white">We never sell, trade, or rent your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Prohibited Content</h2>
              <p className="mb-2">ThumbnailGPT strictly prohibits:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Adult content</li>
                <li>Sexual or NSFW content</li>
                <li>Harmful or illegal uploads</li>
              </ul>
              <p className="mt-3">If such content is detected, the account may be banned permanently.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Children's Privacy</h2>
              <p>
                ThumbnailGPT is not intended for children under 13. We do not knowingly collect or store data from
                children under this age.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Your Rights</h2>
              <p className="mb-2">You may request:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Account deletion</li>
                <li>Removal of your generated images</li>
                <li>Correction of your stored information</li>
              </ul>
              <p className="mt-3">Contact us to request these changes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy occasionally. Continued use of ThumbnailGPT means you accept the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Contact Us</h2>
              <p>
                For privacy concerns or support: <span className="text-[#FF8D00]">support@thumbnailgpt.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
