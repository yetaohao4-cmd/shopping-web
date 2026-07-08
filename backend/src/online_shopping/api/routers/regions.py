from fastapi import APIRouter, HTTPException

router = APIRouter()

_REGIONS = [
    {
        "region_id": "reg_cny",
        "name": "China",
        "currency_code": "cny",
        "countries": [
            {"country_code": "cn", "display_name": "China"},
            {"country_code": "us", "display_name": "United States"},
        ],
    }
]


@router.get("")
def list_regions() -> list[dict[str, object]]:
    return _REGIONS


@router.get("/{region_id}")
def get_region(region_id: str) -> dict[str, object]:
    region = next((region for region in _REGIONS if region["region_id"] == region_id), None)
    if region is None:
        raise HTTPException(status_code=404, detail="Region not found.")
    return region
