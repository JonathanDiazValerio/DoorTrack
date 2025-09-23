# Design Guidelines: Contractor Measurement Tracker

## Design Approach
**Utility-Focused Design System Approach** - This is a productivity tool where efficiency and learnability are paramount. Following **Material Design principles** adapted for contractor workflows, emphasizing quick data entry and clear information hierarchy.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 216 100% 50% (Professional blue)
- Surface: 0 0% 98% (Clean whites)
- Text: 220 13% 18% (Dark grays)

**Dark Mode:**
- Primary: 216 100% 60% (Lighter blue for contrast)
- Surface: 220 13% 18% (Dark surfaces)
- Text: 0 0% 95% (Light text)

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Sizes:** text-sm for labels, text-base for inputs, text-lg for headings
- **Weights:** font-medium for headings, font-normal for body text

### Layout System
**Tailwind Spacing Units:** Consistently use 2, 4, 6, 8, and 12 units
- `p-4` for card padding
- `gap-6` for form spacing
- `mb-8` for section separation
- `mx-2` for tight horizontal spacing

### Component Library

**Navigation:**
- Clean header with app title and minimal navigation
- Mobile-first responsive design

**Forms:**
- Large, touch-friendly input fields
- Clear labels positioned above inputs
- Primary action buttons with sufficient padding
- Form sections with subtle borders and background differentiation

**Data Display:**
- Card-based layout for measurement entries
- Timestamp formatting: "Mar 15, 2024 at 2:30 PM"
- Tabular layout for measurement history
- Clear visual separation between different clients' data

**Client Management:**
- Searchable client selector
- "Add New Client" prominently positioned
- Client cards showing measurement count and last activity

**Measurement Entry:**
- Dedicated measurement input form
- Height/Width fields side-by-side on larger screens
- Instant save with visual feedback
- Clear success indicators

**Overlays:**
- Modal dialogs for client creation
- Confirmation dialogs for data actions
- Toast notifications for save confirmations

### Key UX Principles
1. **One-handed operation capability** for mobile use in the field
2. **Minimal cognitive load** - clear labels and intuitive flow
3. **Quick data entry** - large tap targets and logical tab order
4. **Immediate feedback** - visual confirmation of saved data
5. **Error prevention** - input validation and clear formatting hints

### Responsive Behavior
- **Mobile-first:** Optimized for smartphone use in field conditions
- **Desktop enhancement:** Side-by-side layouts for efficiency
- **Consistent spacing** across all screen sizes using the defined spacing system

No images or hero sections needed - this is a functional business tool focused on data entry and retrieval efficiency.