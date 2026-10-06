# Garage & Car Management Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Finalize car management by switching `nextServiceDate` to `LocalDate`, persisting base64 images in PostgreSQL TEXT columns, computing car status dynamically, fixing modal state transitions, and adding inline delete confirmation with image thumbnail controls.

**Architecture:** Spring Boot backend with JPA/PostgreSQL models and REST controller for car CRUD; dynamic status mapped in `CarMapper`; React/Tailwind frontend with client-side canvas compression for images and state-managed modals.

**Tech Stack:** Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL, React 18, Tailwind CSS, Vite.

---

### Task 1: Backend Model, DTOs & Dynamic Status Mapper

**Files:**
- Modify: `backend/main/java/com/example/digitalservicebook/car/Car.java`
- Modify: `backend/main/java/com/example/digitalservicebook/car/dto/CreateCarRequest.java`
- Modify: `backend/main/java/com/example/digitalservicebook/car/dto/UpdateCarRequest.java`
- Modify: `backend/main/java/com/example/digitalservicebook/car/dto/CarResponse.java`
- Modify: `backend/main/java/com/example/digitalservicebook/car/CarMapper.java`

**Step 1: Write unit tests for CarMapper status calculation**
Create `src/test/java/com/example/digitalservicebook/car/CarMapperTest.java` verifying:
- A car with `nextServiceDate` in the past returns `CarStatus.ISSUE`.
- A car with `nextServiceDate` 10 days ahead returns `CarStatus.WARNING`.
- A car with `nextServiceDate` 60 days ahead returns `CarStatus.OK`.

**Step 2: Run test to verify it fails**
Run: `mvn test -Dtest=CarMapperTest`
Expected: FAIL (compilation or test failure because `LocalDate` not yet used)

**Step 3: Update entity, DTOs, and CarMapper**
- In `Car.java`: Change `nextServiceDate` to `LocalDate`, add `columnDefinition = "TEXT"` to `image_url`.
- In `CreateCarRequest.java`, `UpdateCarRequest.java`, `CarResponse.java`: Change `nextServiceDate` to `LocalDate`.
- In `CarMapper.java`: Calculate status dynamically based on `LocalDate.now()`.

**Step 4: Run test to verify it passes**
Run: `mvn test -Dtest=CarMapperTest`
Expected: PASS

**Step 5: Commit**
```bash
git add backend/main/java/com/example/digitalservicebook/car/ src/test/java/com/example/digitalservicebook/car/
git commit -m "feat(backend): use LocalDate, TEXT image column, and dynamic car status in mapper"
```

---

### Task 2: Backend Service Updates & Tests

**Files:**
- Modify: `backend/main/java/com/example/digitalservicebook/car/CarService.java`
- Modify: `backend/main/java/com/example/digitalservicebook/car/CarController.java`

**Step 1: Write test for CarService create and update operations**
Create or update `src/test/java/com/example/digitalservicebook/car/CarServiceTest.java` verifying:
- Updating a car preserves the existing image if the request image is null or empty.
- Updating a car updates the image if a new image string is passed.
- Updating a car allows clearing image if explicit empty or flag is provided.

**Step 2: Run test to verify it fails**
Run: `mvn test -Dtest=CarServiceTest`
Expected: FAIL

**Step 3: Implement CarService update logic**
- In `CarService.java`:
  - In `updateCar`:
    - Update `name`, `licensePlate`, `nextServiceDate`.
    - If `request.getImageUrl() != null`: set `car.setImageUrl(request.getImageUrl())` (allowing preservation if null).
    - Save and return mapped response.

**Step 4: Run test to verify it passes**
Run: `mvn test -Dtest=CarServiceTest`
Expected: PASS

**Step 5: Commit**
```bash
git add backend/main/java/com/example/digitalservicebook/car/CarService.java src/test/java/com/example/digitalservicebook/car/CarServiceTest.java
git commit -m "feat(backend): preserve image on edit and update CarService"
```

---

### Task 3: Client-Side Image Compression & Service Helper

**Files:**
- Create: `frontend/src/utils/imageCompressor.js`
- Modify: `frontend/src/services/garageService.js`

**Step 1: Write image compressor utility**
Create `frontend/src/utils/imageCompressor.js`:
- Reads `File` into an HTML `Image` element.
- Scales canvas to max width/height of 1200px maintaining aspect ratio.
- Exports to JPEG data URL with quality 0.75.

**Step 2: Verify utility compiles/bundles**
Run: `npm run build` in `frontend/`
Expected: Build succeeds without syntax errors.

**Step 3: Update garageService.js**
Ensure `updateCar`, `createCar`, `deleteCar`, `getCars`, `getCar` are cleanly implemented and handle JSON payloads properly.

**Step 4: Commit**
```bash
git add frontend/src/utils/imageCompressor.js frontend/src/services/garageService.js
git commit -m "feat(frontend): add client-side image compression utility"
```

---

### Task 4: Garage Page UI State, Image Preview & Two-Click Delete

**Files:**
- Modify: `frontend/src/pages/Garage.jsx`

**Step 1: Refactor modal open state**
- Separate `openAddModal()` (sets `selectedCar = null`, resets form) and `openEditModal(car)` (sets `selectedCar = car`).
- Fix Detail modal "Upraviť" button to call `openEditModal(selectedCar)`.
- Fix car card "Upraviť" button to call `openEditModal(car)`.

**Step 2: Add image thumbnail and removal in Add/Edit modal**
- When `selectedCar` has `imageUrl` (or user selects a file), display a thumbnail preview.
- Add an "Odstrániť obrázok" button to clear the image.
- When submitting: if a new file is chosen, compress via `compressImage`; if image was removed, send empty string or null; if untouched, preserve `selectedCar.imageUrl`.

**Step 3: Implement two-click inline delete with 3s timeout**
- Store `deleteConfirmId` and timeout ref.
- First click: label shows "Naozaj zmazať?", start 3s timer to reset.
- Second click: trigger `deleteCar(id)`, close Detail modal if open, refresh car list.

**Step 4: Run frontend build check**
Run: `cd frontend && npm run build`
Expected: PASS (zero compilation errors)

**Step 5: Commit**
```bash
git add frontend/src/pages/Garage.jsx
git commit -m "feat(frontend): fix edit modal bug, add image preview/removal, and inline delete UX"
```

---

### Task 5: Full Build & Verification

**Files:**
- Verify whole project

**Step 1: Run backend tests and verify Maven build**
Run: `mvn clean test`
Expected: BUILD SUCCESS

**Step 2: Run frontend build check**
Run: `cd frontend && npm run build`
Expected: Vite build succeeds

**Step 3: Final commit & status update**
Commit any remaining changes and mark plan complete in `docs/plans/task.md`.
