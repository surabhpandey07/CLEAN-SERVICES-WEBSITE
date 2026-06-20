import { Star, ShieldCheck, Home, ArrowRight, CheckCircle2, Check } from 'lucide-react';

interface HomeViewProps {
  onViewChange: (view: 'home' | 'pricing' | 'book' | 'confirmed') => void;
}

export default function HomeView({ onViewChange }: HomeViewProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 bg-gradient-to-br from-[#f8f9ff] via-[#f1f4ff] to-[#e6eeff]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
          {/* Hero Left Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-sans text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-secondary inline" />
              <span>Vetted Professional Cleaners</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight">
              A Spotless Home, <br />
              <span className="text-on-surface-variant font-bold">a Stress-Free Life.</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Experience domestic serenity with our meticulously trained, fully insured professionals. We handle the dust so you can focus on what matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <button
                onClick={() => onViewChange('book')}
                className="bg-primary text-white px-8 py-4 rounded-xl font-sans text-[15px] font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                Book a Cleaning
              </button>
              <button
                onClick={() => onViewChange('pricing')}
                className="bg-white border border-outline-variant text-primary px-8 py-4 rounded-xl font-sans text-[15px] font-bold hover:bg-surface-container transition-colors cursor-pointer"
              >
                View Pricing
              </button>
            </div>
          </div>

          {/* Hero Right Images Group */}
          <div className="flex-grow w-full md:w-auto max-w-md md:max-w-none flex justify-center">
            <div className="relative w-full aspect-square max-w-[440px] rounded-[32px] overflow-hidden shadow-2xl group border border-outline-variant/30 bg-white">
              <img
                className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgytdvPaLyAuGTZRL07JrMnHNeNBnCqaAFKAXpyslIZQv_IwqdwgjdhozlxM0KAaYc37TLzROpa80OBu-RfEMp3GHVNqJN-bHmWUjIoyoqr9ogESIFL4_orFoFqY-MMNav-qNkfnZOslYwFMRXC8V1eY3p18Nug8aqCiOrIGakpTMcVpopVZRn2-RJ_RnA_4teHLI-yeL2W1LIKLLBSAU8ONcn2jWb5UrvO3FmCR92JWSi7cd9bCnesUqxBeJ0GdBZ3mYCeyxlLg"
                alt="Modern, pristine, sun-drenched airy living room clean surfaces"
                referrerPolicy="no-referrer"
              />
              
              {/* Glass Card Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/80 backdrop-blur-md p-5 rounded-2xl flex items-center justify-between border border-white/40 shadow-xl">
                <div className="flex -space-x-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiFYvmWcntsd1cTwm6upgYDapTm-idZ_uOIrSLZ3ZhyCH5WNMdBdVgRXRLFZ48CXIp4wXeFxqUN9Im4EkEyz0GzyQXzjQfKeKGpfED8Ht3VXuFz6EZnIUjslM3AJx_65b7I36drBChADY5s9UePFHZmBnYOvy4cgYdjP6U6EhrlTk0C6gWFkXZlMOunnyGtevU-af8Cm2__lHzOO7YtVd42EnhppRzHBnHOrQuqTvQbhYdt_9RFFFprai6NeL5EEalR9cckW9joA"
                    alt="Female cleaner"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjLkRqK9UT0Vi7Xwb5YJ76vcWgFOP_pQVrKANl0tBbTWX90eUf2EYqeepiJyK_F1BWhrHj2RWNNdACBAy5Oxw1yACNRpK9eRtDocyCyO5E8OQb7Cpb7iZDbVtrkIYX57jOrHrBq4RgDCyh_S-6M633KFCmoEiGGVn33Dkq_HjUyFWrBl2Mlgu83CdGCyifa7UMl9iC1eccKISQOAxVlaDnmnoE2GAefEora5T8rMgYeAm3cHWMJ_a57_fvDbpt548Iutukwtootg"
                    alt="Male cleaner"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ6cnInOFrkn51erN4NOglnC_VvHlc4TQO-rb4GriZ-Izgp9cbXjb_jwPf1te0qw08BE6SPHPRVsi_OdSjSuBL59EYBs2EO91HXY7JE3Gka4NkUJdyJgfmjiAeHK_WwUwnGkDc2qihGcBCXWPVVUHfAlpwp_2psBHBjwXuN2UJwIS6BUIQEaME9wYV1YtoYp18Ch_0vf7BhsUfgpQamrokYRyjwM7sFeQ_SESFvrxvYQSX03fdIRwNyCf-Vwn77ogPjlvOOBl4fg"
                    alt="Cleaner female coordinator"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-sans text-xs font-bold border-2 border-white">
                    +50
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-sans text-xs font-black text-primary uppercase tracking-wider">100% Reliable</p>
                  <p className="font-sans text-[11px] text-on-surface-variant">Vetted Professional Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="bg-surface-container py-8 border-y border-surface-container-highest/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-outline-variant/60">
            {/* Trust Indicator 1 */}
            <div className="flex flex-col items-center justify-center py-2 md:py-0 text-center">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-heading text-lg font-bold text-primary">4.9/5 Rating</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant">Based on 2,500+ satisfied customer reviews</p>
            </div>
            {/* Trust Indicator 2 */}
            <div className="flex flex-col items-center justify-center py-2 md:py-0 text-center">
              <div className="flex items-center gap-2 mb-1">
                <Home className="w-5 h-5 text-primary" />
                <span className="font-heading text-lg font-bold text-primary">10,000+ Homes</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant">Cleaned to complete micro-perfection</p>
            </div>
            {/* Trust Indicator 3 */}
            <div className="flex flex-col items-center justify-center py-2 md:py-0 text-center">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="font-heading text-lg font-bold text-primary">Fully Insured & Bonded</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant">Complete piece of mind and safety guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-heading text-3xl font-bold text-primary">Our Premium Services</h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mx-auto">
            Tailored cleaning solutions designed to fit your unique lifestyle, home, and workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Home Cleaning */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-surface-dim flex flex-col h-full">
            <div className="h-56 relative overflow-hidden bg-surface">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6tTRvqPVBq5HnPaQ2EBMeliVcZdDN3JkqGit7HLB_4keB36_r3szgANKmJ28w-DaSyGxAekzXhrZfex_xBGeKOvhul4b6nb3s82Xdtt6pjF0jv4RZi-Q9LGF8xrBzWuw6fp_SmxI3rwzv2N_6NhhB_JYoQ42YgacOkYuXLdiFZjDVhsVCvwkLpe6UYXko7ei7MUc7tV6PUNU7wVDmOR0pGAhrawTPMSXe9sIz8IIeq_5NPQMIPlRsK3qxiXfomi78fQSfV0CvGQ"
                alt="Bathroom and Kitchen spotless"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full text-primary font-sans text-[11px] font-extrabold uppercase tracking-widest border border-primary/10">
                Residential
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <h3 className="font-heading text-xl text-primary font-bold">Home Cleaning</h3>
              <p className="font-sans text-sm text-on-surface-variant flex-grow leading-relaxed">
                Regular maintenance sweep or intensive scrubbing for every corner of your domestic sanctuary.
              </p>
              
              <ul className="space-y-2.5 pt-1">
                <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                  <Check className="w-4 h-4 text-secondary stroke-[3]" />
                  <span>Kitchen & Bath Deep Clean</span>
                </li>
                <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                  <Check className="w-4 h-4 text-secondary stroke-[3]" />
                  <span>Meticulous Dusting & Vacuuming</span>
                </li>
              </ul>
              
              <button
                onClick={() => onViewChange('pricing')}
                className="text-primary font-bold font-sans text-xs inline-flex items-center gap-1.5 pt-2 group cursor-pointer hover:opacity-80"
              >
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Office Cleaning */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-surface-dim flex flex-col h-full">
            <div className="h-56 relative overflow-hidden bg-surface">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoLs7rLHB_u209kx10MIkSksQI7kUKl66HGYpeYZ2fsFXfEmiNEO5w1TMJIzXF2ZKdUN3xaqSZLe0Bl39cQN95wmIWJR8Rki52c8QvBwmHLP3l_e-lVY4GDxceJK4GAWxaNN8AcgpoyKN0SBo1DyVNLpjMxt_Wvv5jD-x-wEe1XYMn_r6ybHcB02GnWOp7FHVBtKz28EKvoBxSDoMw54Tb_mUTqoeYhev9jTcNoWQDzyPEUGdvQ_BXJCWoRBmCFKVWj3bXRbfLSw"
                alt="Glass modern meeting room office environment"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full text-primary font-sans text-[11px] font-extrabold uppercase tracking-widest border border-primary/10">
                Commercial
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <h3 className="font-heading text-xl text-primary font-bold">Office Cleaning</h3>
              <p className="font-sans text-sm text-on-surface-variant flex-grow leading-relaxed">
                A pristine, hygienic environment to safeguard your workforce and foster daily focus.
              </p>
              
              <ul className="space-y-2.5 pt-1">
                <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                  <Check className="w-4 h-4 text-secondary stroke-[3]" />
                  <span>Sanitized Desks & Hand Rails</span>
                </li>
                <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                  <Check className="w-4 h-4 text-secondary stroke-[3]" />
                  <span>Common Breakroom Maintenance</span>
                </li>
              </ul>
              
              <button
                onClick={() => onViewChange('pricing')}
                className="text-primary font-bold font-sans text-xs inline-flex items-center gap-1.5 pt-2 group cursor-pointer hover:opacity-80"
              >
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Specialized Services */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-surface-dim flex flex-col h-full">
            <div className="h-56 relative overflow-hidden bg-surface">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLS2bjalbiBbu-lY2J2gKvXePsDIoSwfHgbpoi5sqW6eJXiP0-OWw9S5RbS6jZHFGZvXd28I1NHDGZ5TXYVZndwPzL5cGOAjSifD3aQ7MMInQXhRYmUYS2C7rpn6PtxR15XUrche1yVxTfRDKvCPKdmRBrl_-SHVy-Am8Y815_3qJHB5O8l1TexijtWQHvvxSBUZHD2O3Euxx_fu8z4vHWz0uCuWiZJa2Tt8_3KPJfsqwH5zTEKx35GYvwcMnH0AVCYl-v4yW21Q"
                alt="Steamer vacuum cleaners tools"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full text-primary font-sans text-[11px] font-extrabold uppercase tracking-widest border border-primary/10">
                Custom
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <h3 className="font-heading text-xl text-primary font-bold">Specialized Services</h3>
              <p className="font-sans text-sm text-on-surface-variant flex-grow leading-relaxed">
                Post-construction, move-in/out scrubs, or deep carpet fiber revitalizing for demanding projects.
              </p>
              
              <ul className="space-y-2.5 pt-1">
                <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                  <Check className="w-4 h-4 text-secondary stroke-[3]" />
                  <span>Organics & Eco-Friendly Materials</span>
                </li>
                <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                  <Check className="w-4 h-4 text-secondary stroke-[3]" />
                  <span>Commercial-grade Steam Extractors</span>
                </li>
              </ul>
              
              <button
                onClick={() => onViewChange('pricing')}
                className="text-primary font-bold font-sans text-xs inline-flex items-center gap-1.5 pt-2 group cursor-pointer hover:opacity-80"
              >
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works segment */}
      <section id="how-it-works-section" className="py-16 md:py-24 bg-surface-container-low border-y border-surface-container-highest/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Steps Left */}
            <div className="flex-1 space-y-8">
              <h2 className="font-heading text-3xl font-bold text-primary leading-tight">
                Experience Serenity <br />
                <span className="text-on-surface-variant">in 3 Simple Steps</span>
              </h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-black text-sm shrink-0 shadow-md">
                    1
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-primary mb-1">Book Online</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Choose your specific blueprint parameters, select an optimal time, and fetch an instant flat estimate under 60 seconds.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-black text-sm shrink-0 shadow-md">
                    2
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-primary mb-1">We Clean</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Our background-checked professionals reach timely and meticulously scrub your spaces with premium Eco-friendly tools.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-black text-sm shrink-0 shadow-md">
                    3
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-primary mb-1">You Relax</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Step home into a pristine, beautifully fresh sanctuary and completely reclaim your precious free time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Right Lounging Image */}
            <div className="flex-1 relative w-full flex justify-center">
              <div className="relative z-10 w-full max-w-[380px] aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl border border-white bg-white">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKGVaF6l1XPJGr4X4x3UIZqA_oklW5Pwf0Oy7_iWvUI5HWIa2MEA_kkGM09Ww5-M30AQYOjc4zc42TARcYxIKkpP42E1-wpfmiH5-OBUd5Bg3lHLKFU5tDvJHRxv8lWXRVqgfhFOnSoQzwf3mkaUorbeM19cZVuY6aFUxAzSgMo52rxpv3E4lnzcQbsgMahE_ItP2Zy9OfKtMDF8fGYaOwIHWjRbsFzH397pftZ6yx2YVNPQeJAY6CNbwRQmAf-DeQOtp8TtzTjA"
                  alt="Happy homeowner reclining on a clean comfortable couch reading"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-radial from-primary/5 to-transparent rounded-full -z-10 blur-xl"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary">Voices of Serenity</h2>
            <p className="font-sans text-sm text-on-surface-variant">Hear from the families we help reclaim comfort every week.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-surface-dim shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex text-secondary-fixed-dim space-x-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary/80 text-secondary stroke-none" />
                  ))}
                </div>
                <p className="font-sans text-sm text-on-surface italic leading-relaxed mb-6">
                  "The attention to detail was beyond my expectations. I walked in and actually felt my blood pressure drop. It was pure bliss."
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  className="w-11 h-11 rounded-full object-cover border border-outline-variant"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8v83QfCl95ArWprtV65Xp5hEuL6aqTr-hEKt0B2b6jtWnDy0ap1t4c1RkZ_0FKIED28Q2PBjjVp3L31CuMnyIDfSxQij-hSS2qxKvuhAHJDH09h6oIr8Xcf04SnHh1LFGw8DQUtmBwk2yshSPWNBrizbQiPqVDMbE6FdS0Yyyb8BPTIrUI2nO1fN4Y_p6Py2g7W9B5nr2u__c0ONjlnUbIImGCwWO3VYlpk8LNINT1i8SHy1WbDYolvo0F-ceCbPiRUbXRDxy7Q"
                  alt="Sarah Jenkins profile"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-heading text-sm text-primary font-bold">Sarah Jenkins</h5>
                  <p className="font-sans text-[11px] text-on-surface-variant">Austin Homeowner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-surface-dim shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex text-secondary-fixed-dim space-x-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary/80 text-secondary stroke-none" />
                  ))}
                </div>
                <p className="font-sans text-sm text-on-surface italic leading-relaxed mb-6">
                  "As a busy professional, I don't have time to worry about cleaning. CleanSerene is the most reliable service I've ever used. Always flawless."
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  className="w-11 h-11 rounded-full object-cover border border-outline-variant"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIfkpO6KyJE8uVrW8iKt8YorcSbkEBOyLKk5A8sgO75TIIKPH_ShmHCyiiDrJ30N4nNlI_QgMPLb5GI3MQEgY1CtQEjk_puJ8N5FdFesn6rjlFnnK49x-Hzi04v5AK-BoJ6Icdr-tvdkKE6rsZQFjDPTM3n55Xz95auTEPdqqKLsObaPfeRsnZuTSp0ax7hCm9JpDNhFfAJQEW-Rof2rhqVhvyKLY186iyrFdRf8FoJ8n-0rjFMpIOPqosG0PFUCHAubU2ATZUZg"
                  alt="David Chen profile"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-heading text-sm text-primary font-bold">David Chen</h5>
                  <p className="font-sans text-[11px] text-on-surface-variant">Tech Executive</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-surface-dim shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex text-secondary-fixed-dim space-x-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary/80 text-secondary stroke-none" />
                  ))}
                </div>
                <p className="font-sans text-sm text-on-surface italic leading-relaxed mb-6">
                  "The team was so respectful, quiet, and extremely thorough. They didn't just push dirt—they truly cared for my home structure. Highly recommended!"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  className="w-11 h-11 rounded-full object-cover border border-outline-variant"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqEQHzHZpf7TGJ-aQRby9WLXUgT--pq6MmliNoeLVr2WdNV8N1c2NkIrccqea7VD2hzBxaWutOBauKBt3vJduEO87RwRExb3tc0UBmFaIsiq0f5zKwBQ_leX-MSr1Rdn_mUFsPgP0Dvg95LkvfUC38dPoomAfpSriLJC21vdndPQGphjj1bqnSqpka3Bnat41RLKgz0VJYfkKBYliF1nwtN4wH4brc03UEfQd-axe0YubM4bX5nNKlB0M0yU8dSGq1UV-HnbQpCQ"
                  alt="Martha Stewart profile"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-heading text-sm text-primary font-bold">Martha Stewart</h5>
                  <p className="font-sans text-[11px] text-on-surface-variant">Retired Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box Section */}
      <section className="py-12 md:py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="bg-primary rounded-[32px] py-14 px-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial from-primary-container to-transparent opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight">
              Ready to reclaim your time?
            </h2>
            <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Join 10,000+ happy active homeowners and configure your first professional cleaning schedule in minutes.
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => onViewChange('book')}
                className="bg-white text-primary px-10 py-5 rounded-2xl font-sans text-base font-bold shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
              >
                Book Your Cleaning Now
              </button>
            </div>
            
            <p className="text-white/60 font-sans text-[11px] uppercase tracking-wider">
              No prepayment or credit card required to fetch your estimate
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
