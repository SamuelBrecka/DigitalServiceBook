# Design Document: Garage & Car Management (Edit, Delete, Status, Images)

Date: 2026-10-06  
Topic: Garage & Car Management Polish  

## 1. Objectives

- Complete and stabilize the Car Edit, Delete, Status calculation, and Image upload flow in the Garage module.
- Fix UI state bugs when opening edit modal from card or detail view.
- Introduce dynamic, zero-maintenance car status evaluation based on service deadline.
- Optimize vehicle image handling using client-side canvas compression and PostgreSQL TEXT column storage.

## 2. Architecture & Data Model

### 2.1 Entity & DTOs
- **Date Format**: Standardize `nextServiceDate` to `java.time.LocalDate` across:
  - `Car.java`
  - `CreateCarRequest.java`
  - `UpdateCarRequest.java`
  - `CarResponse.java`
- **Image Storage**:
  - `Car.java`: `@Column(name = "image_url", columnDefinition = "TEXT")` to store Base64 Data URLs without `varchar(255)` truncation errors.
- **Dynamic Status**:
  - `CarStatus` enum (`OK`, `WARNING`, `ISSUE`).
  - Evaluated on the fly in `CarMapper.toResponse(Car car)`:
    - If `nextServiceDate < LocalDate.now()` -> `CarStatus.ISSUE`
    - Else if `nextServiceDate <= LocalDate.now().plusDays(30)` -> `CarStatus.WARNING`
    - Else -> `CarStatus.OK`

### 2.2 Backend Service & Controller
- `CarService.java`:
  - `createCar`: Validate fields, set initial status and user, save to database.
  - `updateCar`: Check ownership, update `name`, `licensePlate`, `nextServiceDate`, and update `imageUrl` (preserve current if request image is omitted or empty; support explicit removal if designated flag or empty string).
  - `deleteCar`: Check ownership, delete record.
- `CarController.java`:
  - `PUT /api/cars/{id}` for updating car.
  - `DELETE /api/cars/{id}` for deleting car.

## 3. Frontend Architecture (`Garage.jsx` & `garageService.js`)

### 3.1 Modal State Management
- Explicit functions:
  - `openAddModal()`: Clears `selectedCar` and form errors, opens modal in "Pridať vozidlo" mode.
  - `openEditModal(car)`: Sets `selectedCar = car`, clears form errors, opens modal in "Upraviť vozidlo" mode.
  - Detail modal's "Upraviť" button triggers `openEditModal(selectedCar)` without resetting car state.

### 3.2 Image Processing
- Client-side canvas compression helper:
  - Scales images to max 1200px width/height.
  - Compresses to JPEG format (`quality: 0.75`), keeping payload under ~250KB.
  - Returns Base64 data URL.
- Edit form image controls:
  - Displays thumbnail of current vehicle image when present.
  - "Odstrániť obrázok" action to allow removing the image.
  - If no new file is uploaded and not removed, preserves existing image URL.

### 3.3 Deletion Flow
- Inline two-click confirmation:
  - First click: Button turns to "Naozaj zmazať?" with `deleteConfirmId` active.
  - Timer: 3-second auto-timeout reverts confirmation state if unclicked.
  - Second click: Executes deletion API call, reloads vehicle list, closes Detail modal if open.

## 4. Verification Plan

1. Verify backend compiles with `LocalDate` and `columnDefinition = "TEXT"` using Maven.
2. Verify Car create, update, and delete endpoints with unit/integration tests or API checks.
3. Verify status transitions (future date -> OK, <= 30 days -> WARNING, past date -> ISSUE).
4. Verify frontend modal state transitions (Add, Edit from card, Edit from detail modal, Delete from card and modal).
