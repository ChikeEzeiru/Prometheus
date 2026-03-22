// =========================================================
// BLOG POSTS DATA
// Static content for the Prometheus Moving blog section.
// Each post contains structured content blocks rendered by
// BlogPostPage. Nigerian-specific context throughout.
// =========================================================

// Indicator colours per category.
// The ring is derived automatically in CSS via color-mix at 12.5%.
export const CATEGORY_COLORS = {
  'Moving Advice':      '#0EA5E9',   // sky blue
  'Common Mistakes':    '#EF4444',   // red
  'Moving Guide':       '#10B981',   // emerald
  'Packing Tips':       '#F59E0B',   // amber
  'Moving Tips':        '#8B5CF6',   // violet
  'Moving on a Budget': '#F97316',   // orange
}

export const BLOG_POSTS = [
  // ─────────────────────────────────────────────────────────
  // POST 1 — Questions to ask your mover
  // ─────────────────────────────────────────────────────────
  {
    id: 'questions-to-ask-your-mover',
    category: 'Moving Advice',
    title: '10 Questions Every Nigerian Should Ask Their Mover Before Signing Anything',
    excerpt:
      'Hiring the wrong moving company in Nigeria can cost you more than money — it can cost you your cherished belongings. Before you hand over a single naira deposit, arm yourself with these ten critical questions.',
    readTime: '6 min read',
    date: 'March 10, 2026',
    coverImage: '/images/services-home-relocation.avif',
    content: [
      {
        type: 'lead',
        text: 'The Nigerian moving industry is largely unregulated, which means anyone with a truck and a phone number can call themselves a professional mover. Unfortunately, many Nigerians only discover this the hard way — arriving at their new home to find scratched furniture, broken electronics, or in worst-case scenarios, a mover who has vanished with their belongings. Before you commit to any moving company, these are the ten questions you must ask.',
      },
      {
        type: 'h2',
        text: '1. Are You CAC-Registered?',
      },
      {
        type: 'p',
        text: 'Ask the company for their Corporate Affairs Commission (CAC) registration number and verify it at cac.gov.ng. A registered business has a legal identity and is far less likely to disappear after collecting your deposit. If they hesitate or cannot provide a registration number, treat that as a serious red flag. Any credible moving company operating in Lagos or across Nigeria should have no problem sharing this information upfront.',
      },
      {
        type: 'h2',
        text: '2. What Does Your Insurance Policy Cover?',
      },
      {
        type: 'p',
        text: 'Ask specifically whether the company carries goods-in-transit insurance and what the claims process looks like. Many Nigerian movers will verbally say "we cover everything" but have no actual policy in place. Request documentation. A legitimate insured mover will be able to show you either their policy certificate or at minimum their insurer\'s name and policy number. Ask whether your high-value items — televisions, laptops, artwork, antique furniture — are covered and up to what amount. If they aren\'t covered under the standard plan, enquire about supplemental coverage.',
      },
      {
        type: 'h2',
        text: '3. How Many Crew Members Will You Send?',
      },
      {
        type: 'p',
        text: 'The number of crew directly affects how long your move takes and how carefully items are handled. A two-man team handling a three-bedroom flat will be rushed, tired, and more likely to drop things. For a standard Lagos apartment, you typically need a minimum of three to four trained loaders. Ask whether the crew are full-time employees or day labourers hired for the job — the latter often lack training and have no accountability to the company.',
      },
      {
        type: 'h2',
        text: '4. Is the Truck Size Right for My Move?',
      },
      {
        type: 'p',
        text: 'An undersized truck means multiple trips, more hours, and a higher final bill than quoted. An oversized truck might not fit into your estate\'s access roads. Describe your property to the mover in detail — number of bedrooms, large appliances, quantity of boxes — and ask them to confirm in writing which truck they will send. A reputable mover will come for a physical or video survey before quoting to make sure they match the right vehicle to your move.',
      },
      {
        type: 'h2',
        text: '5. How Do You Handle Fragile Items?',
      },
      {
        type: 'p',
        text: 'Ask whether they use bubble wrap, foam padding, moving blankets, and custom crating for fragile or high-value items. Do they have experience with large flat-screen TVs, glass dining tables, or marble countertops? Will they pack these items themselves, or is it your responsibility? A professional mover should walk you through their fragile-item protocol in detail. If the answer is vague or they say "just wrap it yourself," look elsewhere.',
      },
      {
        type: 'h2',
        text: '6. What Is Your Damage Policy?',
      },
      {
        type: 'p',
        text: 'Ask them directly: "If something is damaged during the move, what happens next?" Get the answer in writing. The best companies will document the condition of your items before loading (either with a checklist or photographs), and have a formal claims window — typically 24 to 48 hours after delivery — during which you can report damage. Be wary of any mover who insists that once items leave the property, they bear no responsibility.',
      },
      {
        type: 'h2',
        text: '7. Do You Disassemble and Reassemble Furniture?',
      },
      {
        type: 'p',
        text: 'Beds, wardrobes, office workstations, and modular shelving often need to be dismantled before they can be safely moved. Ask whether disassembly and reassembly is included in the quoted price or billed separately. Also ask whether their crew have the tools and skill to handle this — incorrectly reassembled flat-pack furniture can be dangerous and will reduce its lifespan significantly.',
      },
      {
        type: 'h2',
        text: '8. Exactly What Is and Is Not Included in the Quote?',
      },
      {
        type: 'p',
        text: 'Nigerian movers are known for quoting a low base price and adding charges on moving day — for stairs, for extra boxes, for waiting time caused by estate gate delays, or for Lagos traffic. Ask for a fully itemised quote that spells out what is included. Confirm whether packing materials are included or sold separately. Find out whether there are surcharges for above-ground floors, long carry distances (where the truck cannot park close to the entrance), or moves that run past a certain time of day.',
      },
      {
        type: 'h2',
        text: '9. Can You Provide References or Recent Reviews?',
      },
      {
        type: 'p',
        text: 'Ask for two or three references from recent customers, and actually call them. Check the company\'s Google Business profile, Instagram page, and any listing on Nigerian review platforms. A company with consistent five-star reviews and prompt responses to negative feedback is a very different proposition from one with no online presence at all. Word-of-mouth in Nigeria is valuable, but always supplement it with your own verification.',
      },
      {
        type: 'h2',
        text: '10. What Is Your Cancellation and Rescheduling Policy?',
      },
      {
        type: 'p',
        text: 'Life happens — your landlord might delay handing over the new property, or your move date might shift due to factors beyond your control. Ask what happens to your deposit if you need to reschedule. Is there a cancellation fee? How much notice do they require? A fair, transparent policy protects both parties. Avoid any company that demands a non-refundable deposit covering more than 20 to 30 percent of the total move cost before the work is done.',
      },
      {
        type: 'p',
        text: 'Taking fifteen minutes to ask these questions before signing can save you enormous stress, money, and heartache on moving day. At Prometheus, we are happy to answer all of them — and put the answers in writing.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // POST 2 — Moving mistakes to avoid
  // ─────────────────────────────────────────────────────────
  {
    id: 'moving-mistakes-to-avoid',
    category: 'Common Mistakes',
    title: '7 Costly Mistakes Nigerians Make When Moving House',
    excerpt:
      'Most moving horror stories in Nigeria are avoidable. The same seven mistakes keep coming up again and again — and every single one of them can be prevented with a bit of planning.',
    readTime: '5 min read',
    date: 'February 24, 2026',
    coverImage: '/images/services-commercial-relocation.avif',
    content: [
      {
        type: 'lead',
        text: 'After years of helping Nigerians relocate across Lagos and beyond, we have seen almost every moving mistake that can be made. The good news is that the most common ones are entirely preventable. If you are planning a move in the next few weeks or months, read this before you book anything.',
      },
      {
        type: 'h2',
        text: '1. Booking Too Late',
      },
      {
        type: 'p',
        text: 'This is the single most common mistake. Many Nigerians finalise their new property, get caught up in the excitement, and only start looking for movers two or three days before the move date. By that point, every reputable company is booked — leaving you scrambling for whoever is available. Whoever is available at short notice is usually whoever no one else wanted to book. Start reaching out to moving companies at least two to three weeks in advance, and four to six weeks out for a large home or a move that involves storage.',
      },
      {
        type: 'h2',
        text: '2. Not Decluttering First',
      },
      {
        type: 'p',
        text: 'Every unnecessary item you move costs you money — in packing materials, in truck space, and in the time it takes the crew to handle it. Before you book movers, spend a weekend going room by room and sorting items into keep, donate, and dispose piles. Old clothes, broken appliances, furniture that will not fit the new space, accumulated junk from spare rooms — none of it should travel with you. The less you move, the faster the job goes and the lower your final bill.',
      },
      {
        type: 'h2',
        text: '3. Choosing to Move on Fridays or at Month-End',
      },
      {
        type: 'p',
        text: 'In Lagos, Friday traffic is unpredictable at the best of times. Add a moving truck to the Lekki-Epe Expressway or the Third Mainland Bridge on a Friday afternoon and you have a recipe for a nine-hour move that should have taken three. Month-end is equally problematic because many people schedule their moves when their lease ends — creating a sudden peak in demand that drives up prices and stretches movers thin. If your lease allows any flexibility, aim for a Tuesday, Wednesday, or Thursday, mid-month. You will get better service, often a better price, and far less traffic stress.',
      },
      {
        type: 'h2',
        text: '4. Not Labelling Boxes Properly',
      },
      {
        type: 'p',
        text: 'Packing thirty identical brown boxes and then spending three days in your new home rummaging through them to find your kettle is entirely self-inflicted. Label every box on the top and on at least two sides — not just "Kitchen" but "Kitchen — pots and pans" or "Kitchen — fragile: glass." Use coloured tape or markers to colour-code boxes by room. Mark any box containing fragile items visibly on all sides. This makes directing the movers on arrival straightforward and makes your own unpacking far more manageable.',
      },
      {
        type: 'h2',
        text: '5. Leaving Utility Transfers Too Late',
      },
      {
        type: 'p',
        text: 'Between NEPA (or your DISCO), water board registrations, and internet provider installations, getting utilities live in a new Lagos property can take anywhere from three days to three weeks. Many Nigerians land in their new home and have no electricity or running water for the first several days because they forgot to initiate the transfer process beforehand. Start the utility changeover process at least two weeks before your move date. Contact your current internet provider about transfer or cancellation, and find out who supplies the new property before you arrive.',
      },
      {
        type: 'h2',
        text: '6. Not Photographing Valuables Beforehand',
      },
      {
        type: 'p',
        text: 'Before any item leaves your property on moving day, take clear photographs of its condition — especially electronics, furniture, appliances, and anything of sentimental or high monetary value. This takes roughly twenty minutes but is invaluable if you need to make a damage claim. Without photographic evidence of the pre-move condition, a moving company can dispute that any damage was caused during the move. Your phone\'s camera is all you need — just make sure the images are date-stamped.',
      },
      {
        type: 'h2',
        text: '7. Trusting Word-of-Mouth Without Vetting',
      },
      {
        type: 'p',
        text: 'A neighbour\'s recommendation or a contact from a WhatsApp group is a starting point, not a final decision. "My cousin used them and it was fine" does not tell you whether the company is CAC-registered, insured, or what they do when something goes wrong. Always verify independently: check their Google reviews, call their office rather than just a mobile number, and ask the questions listed in our other article before committing. Reputable companies will not be offended by due diligence — in fact, they welcome it.',
      },
      {
        type: 'callout',
        text: 'Pro tip: Create a simple moving checklist six weeks before your move date and work through it systematically. The checklist does not need to be elaborate — even a plain note on your phone is enough to make sure nothing slips through the cracks. We have a free one available on request.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // POST 3 — Guide to stress-free move in Lagos
  // ─────────────────────────────────────────────────────────
  {
    id: 'guide-to-stress-free-move',
    category: 'Moving Guide',
    title: 'Your Complete Guide to a Stress-Free Move in Lagos',
    excerpt:
      'Moving in Lagos is a unique challenge — traffic, tight estate access, unpredictable power supply, and the sheer density of the city all conspire against a smooth relocation. This week-by-week guide will get you through it.',
    readTime: '8 min read',
    date: 'February 5, 2026',
    coverImage: '/images/services-fragile-packaging.avif',
    content: [
      {
        type: 'lead',
        text: 'Lagos is one of the most vibrant, dynamic cities in Africa — and one of the most challenging cities in the world to move house in. Traffic on the island can turn a 20-minute journey into a 90-minute ordeal. Estates have gate protocols that slow down every truck that enters. NEPA can cut power at the worst possible moment. But with the right plan and the right timeline, a Lagos move can be genuinely smooth. Here is a week-by-week breakdown of exactly what to do.',
      },
      {
        type: 'h2',
        text: '6 Weeks Out — Start Planning Now',
      },
      {
        type: 'p',
        text: 'Six weeks sounds early, but this is the time to make the foundational decisions that everything else depends on. Confirm your move-out date with your current landlord and your move-in date with your new landlord or property agent. Even a one-day discrepancy can force you into emergency storage. Begin notifying important contacts of your upcoming address change — your employer, children\'s schools, bank branches, and NIMC for your National Identification details. Contact your current internet and DSTV provider to ask about transfer timelines; installations in Lagos can take one to two weeks.',
      },
      {
        type: 'callout',
        text: 'Pro tip: Ask your new landlord or the estate management office about their rules for moving trucks — some estates in Lekki, VGC, and Ajah only allow moves between 7am and 5pm on weekdays, and ban trucks outright on Sundays. Finding this out at 6 weeks gives you time to plan around it rather than scramble on the day.',
      },
      {
        type: 'h2',
        text: '4 Weeks Out — Declutter and Get Quotes',
      },
      {
        type: 'p',
        text: 'At four weeks, you should begin the decluttering process in earnest. Work through each room systematically — spare bedroom first, then living room, then kitchen — sorting items into keep, donate, and dispose. Bagged Market in Yaba and various estate sales groups on Lagos Facebook and WhatsApp are excellent outlets for furniture you no longer need. Once you have a realistic sense of what you are moving, contact at least three moving companies for quotes. For each one, describe your home in full — number of rooms, large appliances, approximate number of boxes, floor level, and whether your new property has a lift or stairs.',
      },
      {
        type: 'h2',
        text: '2 Weeks Out — Book Your Movers and Begin Packing',
      },
      {
        type: 'p',
        text: 'By two weeks out, you should have selected and booked your moving company — with a confirmed date, a written quote, and a deposit receipt. Do not leave this any later. Start packing non-essential items: books, seasonal clothing, decorative items, rarely used kitchenware, documents and files, spare linens. Pack room by room so boxes are naturally grouped together. Label everything clearly — room, contents, and whether it is fragile. Resist the urge to create "miscellaneous" boxes; they create chaos on the other end. Order any additional packing materials you need: quality moving boxes (not supermarket delivery boxes, which are too weak), bubble wrap, packing tape, and markers.',
      },
      {
        type: 'callout',
        text: 'Pro tip: Pack an "open first" box for each major room — essentials you will need in the first 24 hours: phone chargers, toiletries, a change of clothes, basic cooking supplies, bedding, and any medication. Label this box clearly and load it last so it comes off the truck first.',
      },
      {
        type: 'h2',
        text: '1 Week Out — Finish Packing and Confirm Everything',
      },
      {
        type: 'ul',
        items: [
          'Finish packing all rooms except for daily essentials (bed, toothbrush, kettle, basic clothes).',
          'Call your moving company to confirm the date, arrival time, truck size, and number of crew.',
          'Photograph every item of value in your current home — electronics, furniture, appliances.',
          'Notify your estate security that movers will be arriving on a specific date and roughly what time.',
          'Confirm with the new estate or building management that your truck will be allowed access.',
          'Arrange for a friend or family member to be at the destination to direct the movers if you cannot be in two places at once.',
          'Defrost your fridge and freezer — this needs at least 24 hours and the appliance must be completely dry before it can be safely transported.',
          'Dismantle any furniture that needs to be taken apart (bed frames, wardrobes) if your movers are not doing this.',
          'Withdraw enough cash for any incidental expenses on moving day — gate fees, tips, refreshments for the crew.',
        ],
      },
      {
        type: 'h2',
        text: 'Moving Day — Start Early and Stay Calm',
      },
      {
        type: 'p',
        text: 'Lagos traffic follows a reliable pattern: it is manageable between 6am and 8am, then grinds to a halt. Schedule your movers to arrive at your property no later than 7am. An early start means you get ahead of Third Mainland, Eko Bridge, and expressway traffic, and gives you a buffer if anything runs long. When the crew arrives, do a walkthrough with them and point out any items that need special care. Take a final set of photos of your home before loading begins.',
      },
      {
        type: 'callout',
        text: 'Pro tip: Designate one person — yourself or a trusted helper — as the on-site coordinator whose job is to direct the crew, answer questions, and make sure nothing is left behind. Trying to pack, direct, and manage the logistics simultaneously is the fastest way to make avoidable mistakes.',
      },
      {
        type: 'p',
        text: 'Keep your essentials bag (phone, chargers, documents, keys, medication, valuables) with you personally throughout the move — never load it onto the truck. Before the truck leaves, do a thorough final walkthrough: check every room, every cupboard, the loft or store if you have one, outside spaces, the gate house, and anywhere you may have stored items. Confirm all utilities are switched off and all windows and doors are locked.',
      },
      {
        type: 'h2',
        text: 'After the Move — Unpack by Priority',
      },
      {
        type: 'p',
        text: 'Once the truck has unloaded at the new property, direct the crew to place boxes in the correct rooms using your labelling system — this saves you moving heavy boxes yourself after they leave. Inspect every item for damage before signing off on the delivery and paying the final balance. Report any damage to the moving company in writing (WhatsApp message with time-stamp counts) within 24 hours. Do not try to unpack everything on the first day — that is a reliable path to exhaustion. Prioritise in this order: bed and bedding first (so you can sleep), bathroom essentials, kitchen basics, then everything else at a manageable pace over the next few days.',
      },
      {
        type: 'ol',
        items: [
          'Complete your address change with your bank — visit the branch or use the app/USSD code.',
          'Register with the new DISCO (electricity distribution company) for your area and sort meter preloading.',
          'Update your address on your driver\'s licence and vehicle registration if applicable.',
          'Notify your children\'s schools, doctor, and any subscription services.',
          'Get to know your estate — introduce yourself to neighbours, find the nearest pharmacy, confirm refuse collection days.',
        ],
      },
      {
        type: 'callout',
        text: 'A Lagos move done right is not about being stress-free every single moment — it is about having a plan solid enough that when something unexpected happens (and something always does), you have the bandwidth to handle it calmly. Book early, label everything, start with the essentials, and give yourself more time than you think you need. You\'ve got this.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // POST 4 — Room-by-room packing guide
  // ─────────────────────────────────────────────────────────
  {
    id: 'room-by-room-packing-guide',
    category: 'Packing Tips',
    title: 'How to Pack Like a Pro: A Room-by-Room Packing Guide',
    excerpt:
      'Bad packing is the single biggest cause of damaged items on moving day. This room-by-room guide shows you exactly how professionals protect everything from your kitchen glassware to your 65-inch TV.',
    readTime: '7 min read',
    date: 'January 28, 2026',
    coverImage: '/images/services-fragile-packaging.avif',
    content: [
      {
        type: 'lead',
        text: 'Most moving damage is not caused by reckless drivers or careless loaders — it is caused by poor packing. A glass wrapped in a single sheet of newspaper, a wardrobe half-filled with loose items, boxes sealed with cheap tape that gives way on the third staircase. The good news: packing like a professional is not complicated. It just requires the right materials, a bit of patience, and a clear system.',
      },
      {
        type: 'h2',
        text: 'What You Will Need Before You Start',
      },
      {
        type: 'ul',
        items: [
          'Double-walled cardboard boxes in at least three sizes (small, medium, large)',
          'Packing tape — at least 3–4 rolls. Do not use cheap tape; it fails under weight',
          'Bubble wrap for electronics, mirrors, and ceramics',
          'Packing paper or old newspapers for filling voids inside boxes',
          'Permanent markers for labelling (at least two colours)',
          'Stretch wrap (cling film) for bundling items and protecting furniture',
          'Zip-lock bags for small parts — screws, remote batteries, cable ties',
        ],
      },
      {
        type: 'callout',
        text: 'Pro tip: Pack heavy items in small boxes and light items (bedding, pillows, clothing) in large boxes. A large box stuffed with books will either collapse or throw out a mover\'s back — neither of which ends well for your move.',
      },
      {
        type: 'h2',
        text: 'The Kitchen',
      },
      {
        type: 'p',
        text: 'The kitchen is usually the most time-consuming room to pack and the most likely source of breakages. Start with the items you use least — the good china, the baking trays, the blender you bought two Christmases ago. Wrap each glass and ceramic piece individually in packing paper, then place them vertically (like records, not stacked flat) in boxes lined with crumpled paper at the bottom. Fill every void with paper — loose items shift and crack. Your pots and pans can be nested and wrapped in tea towels or clothing. Appliances should be packed in their original boxes if you still have them; if not, wrap them in bubble wrap and pack snugly in appropriately sized boxes. Empty and defrost your freezer at least 24 hours before moving day.',
      },
      {
        type: 'h2',
        text: 'The Living Room',
      },
      {
        type: 'p',
        text: 'Television sets and monitors should be packed in their original boxes if possible. If not, wrap the screen in a moving blanket or thick foam, then place vertically in a box with padding on all sides — never flat, as flat-packing increases the risk of screen cracking under pressure. For artwork and framed photos, tape an X across the glass with masking tape to prevent shattering, then wrap in bubble wrap and place in a flat box with "THIS SIDE UP" written clearly. Disassemble your shelving unit and label every shelf and its corresponding bracket.',
      },
      {
        type: 'h2',
        text: 'The Bedrooms',
      },
      {
        type: 'p',
        text: 'Use your wardrobe boxes for hanging clothes — most professional movers carry them. For folded clothing, suitcases and duffel bags are your best friends: they are padded, have handles, and make excellent boxes that you already own. Strip all beds on moving morning and pack bedding in large bags clearly labelled by room. For mattresses, use a mattress bag or at minimum stretch-wrap the entire mattress — Lagos roads will find every unprotected surface. Take photos of the back of your television and electronics setup before dismantling so you know exactly how to reconnect everything.',
      },
      {
        type: 'h2',
        text: 'The Generator and Outdoor Items',
      },
      {
        type: 'p',
        text: 'This is a uniquely Nigerian moving consideration. Your generator must have its fuel completely drained before loading — not mostly drained, completely drained. Fuel vapour is flammable and movers are legally within their rights to refuse to load a generator with residual fuel. Run it dry the night before your move. For large outdoor items — air conditioning units, water tanks, gateposts — confirm with your landlord what is yours to take and what remains with the property. Disputes over fixtures are one of the most common causes of moving day delays.',
      },
      {
        type: 'callout',
        text: 'Label every box on the side, not the top. When boxes are stacked, you will never see a label on the top — but you will always see one on the side. Include the destination room and a brief contents description on every single box.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // POST 5 — Moving with kids and pets
  // ─────────────────────────────────────────────────────────
  {
    id: 'moving-with-kids-and-pets',
    category: 'Moving Tips',
    title: 'Moving with Kids and Pets: How to Make It Work',
    excerpt:
      'Moving day is stressful enough without a toddler underfoot or a dog that has decided today is the perfect day to escape through an open door. Here is how to manage both — without losing your mind.',
    readTime: '5 min read',
    date: 'January 14, 2026',
    coverImage: '/images/services-home-relocation.avif',
    content: [
      {
        type: 'lead',
        text: 'Most moving advice assumes you are a childless adult with the full run of your home and the ability to pack and supervise without interruption. Reality is usually different. If you have children — especially young ones — or pets, moving day requires an extra layer of planning that most guides skip over entirely. Here is what actually works.',
      },
      {
        type: 'h2',
        text: 'Involve Children in the Process Early',
      },
      {
        type: 'p',
        text: 'Children, particularly those between the ages of four and twelve, respond much better to change when they feel included rather than surprised. Tell them about the move as early as possible — not the day before. Explain where you are going, why, and what will stay the same (their school, their friends, their toys). If they are old enough, let them pack their own "special box" of their most important belongings that travels in the car with you, not on the truck. This gives them a sense of control and ensures their most beloved items arrive safely.',
      },
      {
        type: 'h2',
        text: 'Arrange Care for Young Children on Moving Day',
      },
      {
        type: 'p',
        text: 'If your children are under five, the most practical thing you can do is arrange for them to be elsewhere on moving day. Ask a trusted family member or close friend to take them for the day. A toddler on an active moving site — with heavy furniture in motion, open doors, and distracted adults — is both a safety risk and a significant source of stress for everyone involved. Pick them up once the truck has departed and you have done an initial walkthrough of the new home.',
      },
      {
        type: 'h2',
        text: 'Help Older Children Say Goodbye Properly',
      },
      {
        type: 'p',
        text: 'Older children — particularly teenagers — may experience a genuine sense of loss when leaving a home they have grown up in. Do not dismiss this. Allow them to photograph their old room, have a final hangout with nearby friends, and if possible, involve them in decisions about their new bedroom (colour, layout, arrangement). The more agency they feel in the new home, the faster they will adapt to it.',
      },
      {
        type: 'h2',
        text: 'Moving with Dogs',
      },
      {
        type: 'p',
        text: 'Dogs are creatures of routine and territory, and a move disrupts both. On moving day, keep your dog secured in one room with water, their bed, and a familiar toy — or better yet, arrange for them to spend the day at a trusted person\'s home. Do not let them roam freely around a home full of open doors and strangers carrying boxes. On arrival at the new property, walk the perimeter with your dog before bringing them inside — let them map the new territory. Keep their feeding and walking schedule as consistent as possible in the days following the move.',
      },
      {
        type: 'h2',
        text: 'Moving with Cats',
      },
      {
        type: 'p',
        text: 'Cats handle moves differently from dogs, and typically worse in the short term. They are intensely territorial and the sudden change of environment can cause significant stress. Transport your cat in a secure carrier with a familiar blanket inside. On arrival, confine them to a single quiet room with their litter box, food, water, and bed for at least the first day before gradually introducing them to the rest of the home. Keep all windows and doors closed for the first two weeks — cats that escape into unfamiliar territory can become lost and disoriented even at short distances.',
      },
      {
        type: 'callout',
        text: 'Whatever your situation — two kids, a dog, and a cat — the common principle is this: anyone who cannot meaningfully help on moving day should not be on the moving site. The fewer variables, the smoother the move.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // POST 6 — Choosing the right truck size
  // ─────────────────────────────────────────────────────────
  {
    id: 'choosing-the-right-truck-size',
    category: 'Moving Guide',
    title: 'How to Choose the Right Truck Size for Your Move',
    excerpt:
      'Too small and you are making three trips across Lagos. Too large and the truck cannot fit through your estate gate. Here is a practical guide to matching the right vehicle to your move.',
    readTime: '4 min read',
    date: 'December 30, 2025',
    coverImage: '/images/services-truck-rentals.avif',
    content: [
      {
        type: 'lead',
        text: 'One of the most common — and most avoidable — moving day problems is a truck that is too small for the job. What was supposed to be a one-trip move becomes two or three, the final bill doubles, and you spend the last hours of your moving day exhausted and frustrated. Choosing the right truck size is one of the most practical decisions you can make before your move.',
      },
      {
        type: 'h2',
        text: 'The Standard Sizes You Will Encounter',
      },
      {
        type: 'p',
        text: 'Nigerian moving companies typically operate three categories of vehicle. The first is the small pickup or Hilux (flatbed), suitable only for very small loads — a studio apartment or a handful of items. The second is the medium-sized van or Sprinter (3–5 tonnes), appropriate for a one-bedroom to two-bedroom apartment with modest furniture. The third is the full-size moving truck (7–10 tonnes and above), necessary for three-bedroom flats, four-bedroom homes, duplexes, and any property with large appliances or heavy furniture.',
      },
      {
        type: 'h2',
        text: 'Matching Truck to Home Size',
      },
      {
        type: 'ul',
        items: [
          'Studio / single room: Small pickup or Sprinter van. One trip, minimal crew.',
          '1-bedroom apartment: Sprinter van or small truck. One trip with a 2–3 man crew.',
          '2-bedroom apartment: Medium truck (5 tonne). One trip, 3–4 man crew recommended.',
          '3-bedroom apartment or flat: Large truck (7 tonne). One trip with a 4–5 man crew.',
          '4-bedroom home / duplex: Large truck or two medium trucks. 5+ man crew, plan for a full day.',
          'Office relocation: Varies significantly — request a physical survey from your mover.',
        ],
      },
      {
        type: 'h2',
        text: 'Things That Change the Calculation',
      },
      {
        type: 'p',
        text: 'The bedroom count is a starting point, not the whole picture. If you have been in a property for many years, the volume of accumulated items may require a larger vehicle than the bedroom count suggests. Conversely, if you have recently decluttered or are moving without large appliances (generator, standing freezer, washing machine), you may be able to go smaller. Always disclose the following specifically: number of large appliances, whether you have a generator and what size, number of flat-screen TVs, and whether you have a piano, safe, or other unusually heavy single items.',
      },
      {
        type: 'h2',
        text: 'Estate Access Restrictions',
      },
      {
        type: 'p',
        text: 'Many estates in Lagos — particularly in Lekki, Ikoyi, Magodo, and parts of GRA — have height or weight restrictions at their gates. A large moving truck may be turned back at the entrance, forcing you to transfer items to smaller vehicles on the street. Always confirm with your estate management whether large trucks are permitted entry before your moving day, not on it. Some estates require advance notice and gate passes for moving trucks — sort this out at least a week ahead.',
      },
      {
        type: 'callout',
        text: 'When in doubt, go one size up rather than one size down. The difference in cost between a medium and a large truck is almost always less than the cost of a second trip across Lagos.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // POST 7 — How to save money on your move
  // ─────────────────────────────────────────────────────────
  {
    id: 'how-to-save-money-on-your-move',
    category: 'Moving on a Budget',
    title: 'How to Save Money on Your Move Without Cutting Corners',
    excerpt:
      'Moving in Nigeria does not have to drain your account. These are the legitimate ways to reduce your moving costs — without ending up with a cowboy mover and a missing generator.',
    readTime: '5 min read',
    date: 'December 15, 2025',
    coverImage: '/images/services-commercial-relocation.avif',
    content: [
      {
        type: 'lead',
        text: 'Moving is one of the more significant expenses in a Nigerian household\'s year, and it is one that most people try to minimise — sometimes sensibly, sometimes in ways that end up costing them far more. Here is the distinction that matters: there is a difference between saving money on a move and going cheap on a move. The former is strategic; the latter is a gamble.',
      },
      {
        type: 'h2',
        text: 'Declutter Before You Pack — Not After',
      },
      {
        type: 'p',
        text: 'Every item on that truck costs money to move. The more you declutter before your moving date, the smaller the load, the smaller the truck required, and the lower the final bill. Go through every room two to three weeks before your move with genuine ruthlessness. Sell usable items on Jiji or Facebook Marketplace. Donate to neighbours or local charities. Dispose of anything broken or past its useful life. Most people who do this properly discover they were planning to pay to move things they genuinely do not need or want — which is money saved immediately.',
      },
      {
        type: 'h2',
        text: 'Move Mid-Week and Mid-Month',
      },
      {
        type: 'p',
        text: 'Moving company pricing in Nigeria is not always listed, but it is almost always influenced by demand. Friday moves, weekend moves, and month-end moves are peak-demand periods — many companies charge more, and even those that do not will be stretched thin in terms of crew quality and availability. Moving on a Tuesday or Wednesday, in the middle of the month, can result in meaningfully better rates, better availability of experienced crew, and less Lagos traffic to contend with. If your lease allows any flexibility, use it.',
      },
      {
        type: 'h2',
        text: 'Get at Least Three Quotes',
      },
      {
        type: 'p',
        text: 'This is non-negotiable. Call at least three different moving companies and give each of them the same detailed description of your move. A reputable mover will ask clarifying questions — number of bedrooms, large appliances, distance, floor level, estate access. Compare not just the final figure but what each quote includes: packing materials, disassembly and reassembly, fuel surcharges, staircase fees. The cheapest quote is not always the best value; the most detailed and transparent quote usually is.',
      },
      {
        type: 'h2',
        text: 'Do Your Own Packing',
      },
      {
        type: 'p',
        text: 'Professional packing services are a genuine convenience — and a genuine add-on cost. If budget is a primary concern, pack your own boxes. The keys are starting early (at least two weeks out), sourcing boxes from supermarkets or shops (most will give them away for free), and following the room-by-room system detailed in our packing guide. The areas where you should still consider professional packing: flat-screen TVs, heavy electronic equipment, and any items requiring custom crating. The money you save on packing standard household items yourself can cover those specialist services.',
      },
      {
        type: 'h2',
        text: 'Avoid Extra-Journey Charges',
      },
      {
        type: 'p',
        text: 'Most moving quotes are based on a single trip. If your items do not fit on one truck — because you underestimated your volume, or because you did not declutter — you will pay for a second journey. This can sometimes cost as much as the original quote again. Invest time in an accurate inventory before booking. Have the mover conduct a physical or video survey if possible. Right-sizing the truck from the start is one of the most reliable ways to keep your final bill close to your initial quote.',
      },
      {
        type: 'callout',
        text: 'The one place not to cut corners: the mover itself. An uninsured, unregistered mover may quote ₦30,000 less than a professional company. If a ₦400,000 generator goes missing or a wardrobe arrives in pieces, that ₦30,000 saving evaporates instantly — and you will have very little legal recourse to recover your loss.',
      },
    ],
  },
]
